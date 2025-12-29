from flask import Flask, render_template, request
from PIL import Image
import imagehash
import os
import numpy as np
import threading
import difflib
import requests

app = Flask(__name__, template_folder='plagirism/templates', static_folder='plagirism')
app.config['UPLOAD_FOLDER'] = 'plagirism/uploads'

# Google Custom Search API credentials (use environment variables in production)
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY', '')
GOOGLE_CSE_ID = os.getenv('GOOGLE_CSE_ID', '')

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Lazy-load the sentence transformer model to speed up boot
embedder = None
MODEL_NAME = os.getenv('SENTENCE_MODEL', 'all-MiniLM-L6-v2')
# Persist HF cache across deploys (Render persistent dir)
HF_CACHE_DIR = os.getenv('HF_HOME', os.path.join('/opt/render/project', '.cache', 'huggingface'))
os.makedirs(HF_CACHE_DIR, exist_ok=True)

def get_embedder():
    global embedder
    if embedder is None:
        from sentence_transformers import SentenceTransformer
        embedder = SentenceTransformer(MODEL_NAME, cache_folder=HF_CACHE_DIR)
    return embedder

def quick_similarity(text1, text2):
    # Fast lexical similarity as a fallback while the model warms up
    return float(difflib.SequenceMatcher(None, text1, text2).ratio())

def semantic_similarity(text1, text2):
    try:
        model = get_embedder()
        embeddings = model.encode([text1, text2])
        v1, v2 = np.array(embeddings[0]), np.array(embeddings[1])
        denom = (np.linalg.norm(v1) * np.linalg.norm(v2))
        if denom == 0:
            return 0.0
        return float(np.dot(v1, v2) / denom)
    except Exception:
        # If the model isn't ready or any error occurs, use quick fallback
        return quick_similarity(text1, text2)

def search_google_snippets(query, num_results=5):
    # If API creds are not configured, skip online search gracefully
    if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
        return []
    url = 'https://www.googleapis.com/customsearch/v1'
    params = {
        'key': GOOGLE_API_KEY,
        'cx': GOOGLE_CSE_ID,
        'q': query,
        'num': num_results
    }
    response = requests.get(url, params=params)
    snippets = []
    if response.status_code == 200:
        data = response.json()
        for item in data.get('items', []):
            snippet = item.get('snippet', '')
            if snippet:
                snippets.append(snippet)
    return snippets

# ---------- Text helpers (ensemble similarity) ----------
def _normalize_text(s: str) -> str:
    return ' '.join(''.join(ch.lower() if ch.isalnum() or ch.isspace() else ' ' for ch in s).split())

def _ngrams(s: str, n: int = 3) -> set:
    words = _normalize_text(s).split()
    if len(words) < n:
        return set(words)  # fallback small sets
    return {tuple(words[i:i+n]) for i in range(len(words) - n + 1)}

def _jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 0.0
    inter = len(a.intersection(b))
    union = len(a.union(b))
    return inter / union if union else 0.0

def _phrase_coverage(a: str, b: str) -> float:
    matcher = difflib.SequenceMatcher(None, a, b)
    blocks = matcher.get_matching_blocks()
    matched = sum(block.size for block in blocks)
    avg_len = (len(a) + len(b)) / 2 or 1
    return matched / avg_len

def _extract_keywords(text: str, top_n: int = 5) -> list:
    """Extract most common meaningful words (pseudo TF-IDF)"""
    stop = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'is', 'are', 'was', 'were', 'be', 'been', 'to', 'of', 'for', 'with', 'from', 'by', 'as', 'if', 'this', 'that', 'these', 'those'}
    words = _normalize_text(text).split()
    words = [w for w in words if w not in stop and len(w) > 2]
    from collections import Counter
    freq = Counter(words)
    return [w for w, _ in freq.most_common(top_n)]

def _topic_similarity(text1: str, text2: str) -> float:
    """Compare topics based on keyword overlap"""
    kw1 = set(_extract_keywords(text1))
    kw2 = set(_extract_keywords(text2))
    return _jaccard(kw1, kw2)

def _is_paraphrase(sem_score: float, lex_score: float) -> bool:
    """High semantic + low lexical = likely paraphrase"""
    return sem_score >= 0.75 and lex_score < 0.6

def text_similarity(text1: str, text2: str) -> dict:
    # Components
    try:
        sem = semantic_similarity(text1, text2)
    except Exception:
        sem = 0.0
    lex = float(difflib.SequenceMatcher(None, text1, text2).ratio())
    jac = _jaccard(_ngrams(text1, 3), _ngrams(text2, 3))
    phr = _phrase_coverage(text1, text2)
    topic = _topic_similarity(text1, text2)
    
    # Is it a paraphrase?
    is_paraphrase = _is_paraphrase(sem, lex)

    # Weighted ensemble (favor semantic for detecting paraphrases)
    if is_paraphrase:
        score = max(0.0, min(1.0, 0.65 * sem + 0.1 * lex + 0.15 * jac + 0.05 * phr + 0.05 * topic))
    else:
        score = max(0.0, min(1.0, 0.55 * sem + 0.15 * lex + 0.2 * jac + 0.1 * phr))
    
    # Reasoning
    reasons = []
    if sem >= 0.8:
        reasons.append("High semantic similarity detected (meaning is very similar)")
    elif is_paraphrase:
        reasons.append("Likely paraphrasing detected (same ideas, different words)")
    if jac >= 0.6:
        reasons.append("High phrase overlap (similar phrases/concepts)")
    if lex >= 0.7:
        reasons.append("High textual similarity (wording is similar)")
    if topic >= 0.7:
        reasons.append("Same topic/keywords detected (discussing similar subjects)")
    
    return {
        'semantic': sem,
        'lexical': lex,
        'ngram': jac,
        'phrases': phr,
        'topic': topic,
        'score': score,
        'is_paraphrase': is_paraphrase,
        'reasons': reasons if reasons else ["Low similarity overall"],
    }

# ---------- Code helpers (AST + lexical) ----------
import ast

class _NormalizeNames(ast.NodeTransformer):
    def visit_Name(self, node):
        return ast.copy_location(ast.Name(id='VAR', ctx=node.ctx), node)
    def visit_arg(self, node):
        node.arg = 'ARG'
        return node
    def visit_FunctionDef(self, node):
        node.name = 'FUNC'
        self.generic_visit(node)
        return node
    def visit_ClassDef(self, node):
        node.name = 'CLASS'
        self.generic_visit(node)
        return node
    def visit_Constant(self, node):
        # Replace strings/numbers with a token to reduce superficial differences
        return ast.copy_location(ast.Constant(value='CONST'), node)

def _normalize_code(code: str) -> str:
    try:
        tree = ast.parse(code)
        tree = _NormalizeNames().visit(tree)
        ast.fix_missing_locations(tree)
        return ast.unparse(tree) if hasattr(ast, 'unparse') else ast.dump(tree, include_attributes=False)
    except Exception:
        # Fallback: strip comments/whitespace
        lines = [l for l in code.splitlines() if not l.strip().startswith('#')]
        return '\n'.join(line.strip() for line in lines)

def _node_types(code: str) -> set:
    try:
        tree = ast.parse(code)
        return {type(n).__name__ for n in ast.walk(tree)}
    except Exception:
        return set()

def code_similarity(code1: str, code2: str) -> dict:
    n1 = _normalize_code(code1)
    n2 = _normalize_code(code2)
    lex = float(difflib.SequenceMatcher(None, n1, n2).ratio())
    types1 = _node_types(code1)
    types2 = _node_types(code2)
    struct = _jaccard(types1, types2)
    # Token-level ngram jaccard
    jac = _jaccard(_ngrams(n1, 3), _ngrams(n2, 3))
    score = max(0.0, min(1.0, 0.5 * lex + 0.3 * jac + 0.2 * struct))
    return {
        'lexical': lex,
        'ngram': jac,
        'structure': struct,
        'score': score,
    }

# ---------- Image helpers (multi-hash ensemble) ----------
def image_similarity(path1: str, path2: str) -> float:
    img1 = Image.open(path1)
    img2 = Image.open(path2)
    hashes1 = [imagehash.phash(img1), imagehash.average_hash(img1), imagehash.dhash(img1)]
    hashes2 = [imagehash.phash(img2), imagehash.average_hash(img2), imagehash.dhash(img2)]
    sims = []
    for h1, h2 in zip(hashes1, hashes2):
        # All default to 64-bit hash
        dist = h1 - h2
        sims.append(1 - (dist / 64))
    return float(sum(sims) / len(sims))

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    if request.method == 'POST':
        plagiarism_type = request.form.get('plagiarismType', 'image')
        if plagiarism_type == 'image':
            img1 = request.files.get('image1')
            img2 = request.files.get('image2')
            if img1 and img2:
                path1 = os.path.join(app.config['UPLOAD_FOLDER'], img1.filename)
                path2 = os.path.join(app.config['UPLOAD_FOLDER'], img2.filename)
                img1.save(path1)
                img2.save(path2)
                similarity = image_similarity(path1, path2)
                result = {
                    'similarity': f"{similarity:.2f}",
                    'plagiarized': similarity >= 0.9,
                    'paraphrased': False,
                    'online_similarity': None
                }
        elif plagiarism_type == 'text':
            text1 = request.form.get('text1', '').strip()
            text2 = request.form.get('text2', '').strip()
            if text1 and text2:
                comp = text_similarity(text1, text2)
                sim = comp['score']
                is_paraphrase = comp['is_paraphrase']
                reasons = comp['reasons']
                
                paraphrased = is_paraphrase and 0.75 < sim < 0.9
                plagiarized = sim >= 0.9
                result = {
                    'similarity': f"{sim:.2f}",
                    'plagiarized': plagiarized,
                    'paraphrased': paraphrased,
                    'online_similarity': None,
                    'detection_type': 'Paraphrasing' if is_paraphrase else 'Direct Copy' if plagiarized else 'Similar Topic',
                    'details': {
                        'semantic_score': f"{comp['semantic']:.2f}",
                        'lexical_score': f"{comp['lexical']:.2f}",
                        'topic_match': f"{comp['topic']:.2f}",
                    },
                    'reasons': reasons,
                }
            elif text1:
                # Only one text provided, check against online sources
                snippets = search_google_snippets(text1)
                max_sim = 0
                best_snippet = ''
                best_reasons = []
                for snippet in snippets:
                    comp = text_similarity(text1, snippet)
                    sim = comp['score']
                    if sim > max_sim:
                        max_sim = sim
                        best_snippet = snippet
                        best_reasons = comp['reasons']
                paraphrased = comp['is_paraphrase'] and 0.75 < max_sim < 0.9
                plagiarized = max_sim >= 0.9
                result = {
                    'similarity': f"{max_sim:.2f}",
                    'plagiarized': plagiarized,
                    'paraphrased': paraphrased,
                    'online_similarity': best_snippet if max_sim > 0.7 else None,
                    'detection_type': 'Paraphrasing' if paraphrased else 'Direct Copy' if plagiarized else 'Similar Content',
                    'reasons': best_reasons,
                }
        elif plagiarism_type == 'code':
            code1 = request.form.get('code1', '').strip()
            code2 = request.form.get('code2', '').strip()
            if code1 and code2:
                comp = code_similarity(code1, code2)
                sim = comp['score']
                paraphrased = 0.75 < sim < 0.9
                plagiarized = sim >= 0.9
                result = {
                    'similarity': f"{sim:.2f}",
                    'plagiarized': plagiarized,
                    'paraphrased': paraphrased,
                    'online_similarity': None
                }
    return render_template('index.html', result=result)

if __name__ == '__main__':
    # Don't preload model; let it lazy-load on first request to avoid startup timeout
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)