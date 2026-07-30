#!/bin/bash

# RAW Platform - Firebase Deployment Script
# Simpel script om naar Firebase te deployen

echo "🚀 RAW Platform Deployment Script"
echo "=================================="

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is niet geïnstalleerd"
    echo "Installeer met: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in
echo "🔐 Checking Firebase login..."
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Niet ingelogd bij Firebase"
    echo "Login met: firebase login"
    exit 1
fi

echo "✅ Firebase login OK"

# Build client
echo ""
echo "📦 Building Next.js app..."
cd client
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

cd ..
echo "✅ Build succesvol!"

# Deploy
echo ""
echo "📤 Deploying to Firebase..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment succesvol!"
    echo "🌍 Website: https://raw-check.web.app"
    echo ""
else
    echo "❌ Deployment failed!"
    exit 1
fi
