#!/bin/bash

# AWS S3 Deployment Script for Crossword Setters Hub

echo "🚀 Preparing Crossword Setters Hub for AWS S3 deployment..."

# Create deployment directory
mkdir -p s3-deploy
cd s3-deploy

# Copy all public files
echo "📂 Copying website files..."
cp -r ../public/* .

# Rename main.html to index.html (S3 default page)
echo "🏠 Setting up homepage..."
if [ -f "main.html" ]; then
    mv main.html index.html
    echo "✅ Renamed main.html → index.html"
fi

# Update navigation links in index.html to point to itself
echo "🔗 Updating navigation links..."
if [ -f "index.html" ]; then
    sed -i.bak 's/href="main\.html"/href="index.html"/g' index.html
    rm index.html.bak
    echo "✅ Updated navigation links"
fi

# Update other HTML files to use index.html for home
for file in *.html; do
    if [ "$file" != "index.html" ]; then
        sed -i.bak 's/href="main\.html"/href="index.html"/g' "$file"
        rm "${file}.bak"
    fi
done

# Verify data files are present
echo "📊 Checking data files..."
if [ -f "filtered_words.txt" ]; then
    echo "✅ filtered_words.txt ready"
else
    echo "❌ filtered_words.txt missing"
fi

if [ -f "short_words.txt" ]; then
    echo "✅ short_words.txt ready"
else
    echo "❌ short_words.txt missing"
fi

if [ -f "ProcessedPhrases.csv" ]; then
    echo "✅ ProcessedPhrases.csv ready"
else
    echo "❌ ProcessedPhrases.csv missing"
fi

echo ""
echo "🎯 Files ready for S3 deployment in ./s3-deploy/"
echo ""
echo "📋 Next steps:"
echo "1. Create S3 bucket: aws s3 mb s3://your-crossword-site-name"
echo "2. Enable static hosting in S3 console"
echo "3. Upload files: aws s3 sync ./s3-deploy s3://your-crossword-site-name --delete"
echo "4. Set bucket policy for public access"
echo ""
echo "💡 Your site will be available at:"
echo "   http://your-crossword-site-name.s3-website-region.amazonaws.com"
echo ""

# List files to deploy
echo "📦 Files to deploy:"
find . -type f | sort
