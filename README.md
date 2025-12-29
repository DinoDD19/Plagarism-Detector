# Plagiarism Detector

A Flask-based web application that detects plagiarism in text, code, and images.

## Features

- **Text Plagiarism Detection**: Compare two texts or check text against online sources
- **Image Plagiarism Detection**: Compare two images using perceptual hashing
- **Code Plagiarism Detection**: Compare code snippets for similarity

## Deployment

### Deploy to Render (Recommended - Free Tier Available)

1. **Sign up** at [Render](https://render.com/) and connect your GitHub account
2. **Click "New +"** → Select **"Web Service"**
3. **Connect Repository**: Select `DinoDD19/Plagarism-Detector`
4. **Configure Settings**:
   - **Name**: `plagiarism-detector` (or your preferred name)
   - **Region**: Choose closest to your location
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -w 1 -k gthread --threads 8 -t 180 app:app`
5. **Add Environment Variables** (Settings → Environment):
   - `GOOGLE_API_KEY`: Your Google Custom Search API key
   - `GOOGLE_CSE_ID`: Your Google Custom Search Engine ID
   - _(Optional)_ `SENTENCE_MODEL`: Model name (default: `all-MiniLM-L6-v2`)
6. **Click "Create Web Service"**
7. **Wait for deployment** (first build takes 3-5 minutes)
8. **Access your app** at `https://your-service-name.onrender.com`

**Important Notes**:
- First text/code plagiarism check will take 30-90 seconds (model download)
- Subsequent requests are instant (model is cached)
- Free tier may spin down after inactivity; first request after idle takes ~30s to wake up

### Deploy to Railway

1. Fork this repository
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect and deploy your Flask app

### Deploy to Railway (Recommended - Easiest)

1. Go to [Railway](https://railway.app/) and sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `DinoDD19/Plagarism-Detector`
4. Railway auto-detects Python and uses `Procfile` & `runtime.txt` automatically
5. Set **Environment Variables** in Railway dashboard:
   - `GOOGLE_API_KEY`: Your Google Custom Search API key (optional; text/code work without)
   - `GOOGLE_CSE_ID`: Your Google Custom Search Engine ID (optional)
6. Click **"Deploy"**
7. App will auto-deploy on every push to `main` (native GitHub integration)

That's it — no secrets, no workflows needed!

## Local Installation

1. Clone the repository
```bash
git clone https://github.com/DinoDD19/Plagarism-Detector.git
cd Plagarism-Detector
```

2. Create and activate virtual environment (recommended)
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/Mac
source .venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. (Optional) Set environment variables
```bash
# Windows PowerShell
$env:GOOGLE_API_KEY="your-key-here"
$env:GOOGLE_CSE_ID="your-cse-id-here"

# Linux/Mac
export GOOGLE_API_KEY="your-key-here"
export GOOGLE_CSE_ID="your-cse-id-here"
```

5. Run the application
```bash
python app.py
```

6. Open your browser and go to `http://localhost:5000`

## Environment Variables

Required for online text plagiarism detection:
- `GOOGLE_API_KEY`: Google Custom Search API key ([Get it here](https://developers.google.com/custom-search/v1/overview))
- `GOOGLE_CSE_ID`: Google Custom Search Engine ID ([Create one here](https://programmablesearchengine.google.com/))

Optional:
- `PORT`: Port number (default: 5000, auto-set by most platforms)
- `SENTENCE_MODEL`: Sentence transformer model (default: `all-MiniLM-L6-v2`)

**Note**: Image and code plagiarism work without API keys. Online text search requires valid Google API credentials.

## Requirements

- Python 3.11+
- Flask 2.3.2
- Pillow 10.4.0
- imagehash 4.3.1
- numpy 1.26.4
- sentence-transformers 2.2.2
- requests 2.31.0
- gunicorn 21.2.0 (for deployment)

See [requirements.txt](requirements.txt) for full list.

## Troubleshooting

**Deployment Issues:**
- Build fails with KeyError: Clear build cache on Render and redeploy
- App times out on start: First boot loads the ML model (takes 30-90s on free tier)
- "Application failed to respond": Check logs; may need higher timeout or better instance type

**Runtime Issues:**
- Text/code check slow on first use: Model downloads on first request (cached after)
- Online search returns no results: Verify GOOGLE_API_KEY and GOOGLE_CSE_ID are set correctly
- Upload fails: Ensure `plagirism/uploads` directory exists and is writable

## License

MIT License
