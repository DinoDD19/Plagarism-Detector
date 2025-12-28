#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Deployment Verification Script
# This script checks if all necessary deployment files are present

echo "🔍 Checking deployment configuration..."
echo ""

# Check for required files
required_files=("Procfile" "requirements.txt" "runtime.txt" ".env.example" "app.py")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file is missing"
        missing_files+=("$file")
    fi
done

echo ""

# Check Procfile content
if [ -f "Procfile" ]; then
    if grep -q "gunicorn app:app" Procfile; then
        echo "✓ Procfile is correctly configured"
    else
        echo "⚠ Procfile may need correction"
    fi
fi

# Check runtime.txt
if [ -f "runtime.txt" ]; then
    echo "✓ Python version specified: $(cat runtime.txt)"
fi

# Check for .github/workflows
if [ -d ".github/workflows" ]; then
    echo "✓ GitHub Actions workflows directory exists"
    workflow_count=$(find .github/workflows -name "*.yml" -o -name "*.yaml" | wc -l)
    echo "  Found $workflow_count workflow(s)"
fi

echo ""
echo "📋 Summary:"
if [ ${#missing_files[@]} -eq 0 ]; then
    echo "✓ All deployment files are present"
    echo "✓ Ready to deploy to Render, Heroku, Railway, or other platforms"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes to GitHub"
    echo "2. Follow the instructions in DEPLOYMENT.md"
    echo "3. Set up environment variables on your deployment platform"
    exit 0
else
    echo "✗ Missing files: ${missing_files[*]}"
    echo "Please create the missing files before deploying"
    exit 1
fi
