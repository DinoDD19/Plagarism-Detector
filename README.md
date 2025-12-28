# Plagiarism Detector

A Flask-based web application that detects plagiarism in text, code, and images.

## Features

- **Text Plagiarism Detection**: Compare two texts or check text against online sources
- **Image Plagiarism Detection**: Compare two images using perceptual hashing
- **Code Plagiarism Detection**: Compare code snippets for similarity

## Deployment

### Deploy to Render

1. Fork this repository
2. Go to [Render](https://render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: plagiarism-detector
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment**: Python 3
6. Click "Create Web Service"

### Deploy to Railway

1. Fork this repository
2. Go to [Railway](https://railway.app/)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect and deploy your Flask app

### Deploy to Heroku

1. Fork this repository
2. Create a Heroku account at [heroku.com](https://heroku.com)
3. Install Heroku CLI
4. Run:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

## Local Installation

1. Clone the repository
```bash
git clone https://github.com/DinoDD19/Plagarism-Detector.git
cd Plagarism-Detector
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the application
```bash
python app.py
```

4. Open your browser and go to `http://localhost:5000`

## Environment Variables

- `PORT`: Port number (default: 5000)
- `GOOGLE_API_KEY`: Google Custom Search API key
- `GOOGLE_CSE_ID`: Google Custom Search Engine ID

## Requirements

- Python 3.11+
- Flask 2.3.2
- See requirements.txt for full list

## License

MIT License
