# Deployment Guide

This guide explains how to deploy the Plagiarism Detector application using GitHub and various hosting platforms.

## Prerequisites

- A GitHub account with the repository
- Python 3.11 or higher
- Git installed locally

## Quick Start - Deploy to Render (Recommended)

Render offers free hosting for web applications and integrates seamlessly with GitHub.

### Step 1: Prepare Your Repository

1. Ensure all deployment files are committed to your GitHub repository:
   - `Procfile` - Tells the server how to run your app
   - `requirements.txt` - Lists all Python dependencies
   - `runtime.txt` - Specifies Python version
   - `.env.example` - Template for environment variables

### Step 2: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create a New Web Service

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository `DinoDD19/Plagarism-Detector`
3. Configure the service:
   - **Name**: `plagiarism-detector` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: `Free`

### Step 4: Set Environment Variables

In Render's dashboard, go to your web service and add these environment variables:

```
GOOGLE_API_KEY=your_actual_api_key_here
GOOGLE_CSE_ID=your_actual_cse_id_here
```

**Important**: Replace the default API keys with your own Google Custom Search API credentials.

### Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy your application
3. You'll receive a URL like `https://plagiarism-detector.onrender.com`

## Alternative Deployment Options

### Deploy to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables:
   ```bash
   heroku config:set GOOGLE_API_KEY=your_api_key
   heroku config:set GOOGLE_CSE_ID=your_cse_id
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in the Variables tab
6. Railway will automatically detect and deploy your Flask app

### Deploy to PythonAnywhere

1. Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)
2. Go to "Web" tab and click "Add a new web app"
3. Choose Flask and Python 3.11
4. Upload your code via Git or the file browser
5. Configure the WSGI file to point to your app
6. Set environment variables in the web app configuration

## Environment Variables

The application requires the following environment variables:

- `GOOGLE_API_KEY`: Your Google Custom Search API key
- `GOOGLE_CSE_ID`: Your Custom Search Engine ID

### Getting Google API Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Custom Search API"
4. Create credentials (API Key)
5. Create a Custom Search Engine at [cse.google.com](https://cse.google.com/cse/)
6. Get your Search Engine ID

## Local Development

To run the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/DinoDD19/Plagarism-Detector.git
   cd Plagarism-Detector
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

5. Edit `.env` and add your API credentials

6. Run the application:
   ```bash
   python app.py
   ```

7. Open your browser to `http://localhost:5000`

## Continuous Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs on every push to main/master branch
- Runs on every pull request
- Tests Python syntax
- Validates application imports

Most deployment platforms (Render, Heroku, Railway) support automatic deployment:
- They watch your GitHub repository
- When you push changes to main/master, they automatically redeploy
- No manual steps required after initial setup

## Troubleshooting

### Application Won't Start

- Check that `Procfile` exists and contains: `web: gunicorn app:app`
- Verify all dependencies are in `requirements.txt`
- Check platform logs for specific error messages

### API Errors

- Verify your Google API credentials are correctly set
- Check API quotas in Google Cloud Console
- Ensure Custom Search API is enabled

### File Upload Issues

- The application creates an `uploads` folder automatically
- Ensure the platform has write permissions
- Check storage limits on free tier plans

### Memory Issues

- Sentence transformers require ~1GB RAM
- Use platforms with sufficient memory (Render free tier: 512MB may be tight)
- Consider upgrading to paid tier if needed

## Security Notes

- **Never commit `.env` file to GitHub** (it's in `.gitignore`)
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor API usage to prevent quota exhaustion

## Support

For issues or questions:
- Open an issue on GitHub
- Check platform-specific documentation
- Review application logs for errors

## License

This project is available for educational purposes.
