# Multi-Modal Plagiarism Detector

A Flask-based web application that detects plagiarism across multiple content types: images, text, and code.

## Features

- **Image Plagiarism Detection**: Uses perceptual hashing to compare images
- **Text Plagiarism Detection**: Employs semantic similarity analysis using sentence transformers
- **Code Plagiarism Detection**: Analyzes code similarity using advanced NLP techniques
- **Online Source Checking**: Searches Google for similar content online
- **User-Friendly Interface**: Clean, responsive web interface built with Bootstrap

## Technology Stack

- **Backend**: Flask (Python)
- **Image Processing**: Pillow, imagehash
- **NLP**: sentence-transformers, scikit-learn
- **Frontend**: HTML, CSS, Bootstrap 5
- **Deployment**: Gunicorn, compatible with Render, Heroku, Railway

## Quick Deploy

### Deploy to Render (Free)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

1. Fork this repository
2. Sign up at [render.com](https://render.com)
3. Create a new Web Service and connect your repository
4. Set environment variables (see below)
5. Deploy automatically

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.**

## Local Installation

1. Clone the repository:
```bash
git clone https://github.com/DinoDD19/Plagarism-Detector.git
cd Plagarism-Detector
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Google API credentials
```

5. Run the application:
```bash
python app.py
```

6. Open your browser to `http://localhost:5000`

## Environment Variables

Create a `.env` file with the following variables:

```
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CSE_ID=your_custom_search_engine_id
```

### Getting Google API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Custom Search API
3. Create an API key
4. Set up a Custom Search Engine at [cse.google.com](https://cse.google.com/cse/)

## Usage

1. Select the type of content to check (Image, Text, or Code)
2. Upload or paste your content
3. Click "Compare" to analyze
4. View the similarity score and plagiarism detection results

### Understanding Results

- **Plagiarism Detected**: Items are nearly identical (similarity ≥ 0.95)
- **Paraphrasing Detected**: Items are similar but not identical (0.75 < similarity < 0.95)
- **Items are Different**: Low similarity detected

## Project Structure

```
Plagarism-Detector/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── Procfile               # Deployment configuration
├── runtime.txt            # Python version specification
├── .env.example           # Environment variables template
├── DEPLOYMENT.md          # Deployment instructions
├── plagirism/
│   ├── templates/
│   │   └── index.html    # Web interface
│   └── uploads/          # Temporary file storage
└── .github/
    └── workflows/
        └── ci.yml        # GitHub Actions CI/CD
```

## Deployment

This application is ready to deploy on multiple platforms:

- **Render** (Recommended, Free tier available)
- **Heroku** (Free tier with credit card)
- **Railway** (Free tier available)
- **PythonAnywhere** (Free tier available)

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment instructions for each platform.

## GitHub Actions

The repository includes a CI/CD pipeline that:
- Validates Python syntax
- Tests application imports
- Runs on every push and pull request

## Security

- API keys are stored in environment variables
- `.env` file is excluded from version control
- Uploaded files are stored temporarily
- No data is permanently stored

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is available for educational purposes.

## Acknowledgments

- Perceptual hashing for image comparison
- Sentence transformers for semantic similarity
- Bootstrap for UI components
- Google Custom Search API for online source checking

## Support

For deployment issues, see [DEPLOYMENT.md](DEPLOYMENT.md)

For other questions, open an issue on GitHub.
