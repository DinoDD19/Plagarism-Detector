from flask import Flask, render_template, request
from PIL import Image
import imagehash
import os
import difflib
import requests

app = Flask(__name__, template_folder='plagirism/templates', static_folder='plagirism')
app.config['UPLOAD_FOLDER'] = 'plagirism/uploads'

# Google Custom Search API credentials (use environment variables in production)
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY', '')
GOOGLE_CSE_ID = os.getenv('GOOGLE_CSE_ID', '')

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def similarity_score(text1, text2):
    """
    Calculate similarity using sequence matching (0.0 to 1.0).
    Fast, no external ML model needed.
    """
    return float(difflib.SequenceMatcher(None, text1.lower(), text2.lower()).ratio())

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
                hash1 = imagehash.phash(Image.open(path1))
                hash2 = imagehash.phash(Image.open(path2))
                distance = hash1 - hash2
                similarity = 1 - (distance / 64)  # 64 is the hash size for phash
                result = {
                    'similarity': f"{similarity:.2f}",
                    'plagiarized': distance < 5,
                    'paraphrased': False,
                    'online_similarity': None
                }
        elif plagiarism_type == 'text':
            text1 = request.form.get('text1', '').strip()
            text2 = request.form.get('text2', '').strip()
            if text1 and text2:
                sim = similarity_score(text1, text2)
                paraphrased = 0.75 < sim < 0.95
                plagiarized = sim >= 0.95
                result = {
                    'similarity': f"{sim:.2f}",
                    'plagiarized': plagiarized,
                    'paraphrased': paraphrased,
                    'online_similarity': None
                }
            elif text1:
                # Only one text provided, check against online sources
                snippets = search_google_snippets(text1)
                max_sim = 0
                best_snippet = ''
                for snippet in snippets:
                    sim = similarity_score(text1, snippet)
                    if sim > max_sim:
                        max_sim = sim
                        best_snippet = snippet
                paraphrased = 0.75 < max_sim < 0.95
                plagiarized = max_sim >= 0.95
                result = {
                    'similarity': f"{max_sim:.2f}",
                    'plagiarized': plagiarized,
                    'paraphrased': paraphrased,
                    'online_similarity': best_snippet if max_sim > 0.7 else None
                }
        elif plagiarism_type == 'code':
            code1 = request.form.get('code1', '').strip()
            code2 = request.form.get('code2', '').strip()
            if code1 and code2:
                sim = similarity_score(code1, code2)
                paraphrased = 0.75 < sim < 0.95
                plagiarized = sim >= 0.95
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