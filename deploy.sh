#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Deploying to GitHub Pages..."

# Create gh-pages branch if it doesn't exist
git checkout -b gh-pages 2>/dev/null || git checkout gh-pages

# Copy files to gh-pages branch
git checkout main -- index.html README.md

# Commit changes
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

# Switch back to main branch
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your site should be available at: https://rajendra-mdr.github.io/field-marketing-dashboard/"
echo ""
echo "📝 Note: If the site doesn't load immediately, wait a few minutes for GitHub Pages to build." 