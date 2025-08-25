#!/bin/bash

echo "🚀 Deploying Prepify to your existing Firebase project..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "🔐 Logging into Firebase..."
firebase login

# Install dependencies
echo "📦 Installing dependencies..."
cd functions && npm install && cd ..

# Deploy Firestore rules
echo "📋 Deploying Firestore rules..."
firebase deploy --only firestore:rules

# Deploy Functions
echo "⚡ Deploying Firebase Functions..."
firebase deploy --only functions

# Build React app
echo "🏗️ Building React app..."
cd client && npm run build && cd ..

# Deploy Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌍 Your website is now live at: https://studywebsite-4f6b9.web.app"
echo "🔗 API is available at: https://us-central1-studywebsite-4f6b9.cloudfunctions.net/api"
