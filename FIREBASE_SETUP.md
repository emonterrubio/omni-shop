# Firebase GitHub Actions Setup

This document provides instructions for setting up automatic deployment from GitHub to Firebase Hosting.

## 🔑 Required Setup

### Step 1: Generate Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/project/omni-shopping-4111b)
2. Click on the **Settings gear icon** → **Project settings**
3. Navigate to the **Service accounts** tab
4. Click **Generate new private key**
5. Download the JSON file (keep it secure!)

### Step 2: Add GitHub Secret

1. Go to your GitHub repository: https://github.com/emonterrubio/omni-shop
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. **Name**: `FIREBASE_SERVICE_ACCOUNT_OMNI_SHOPPING_4111B`
5. **Value**: Copy and paste the entire content of the JSON file from Step 1

### Step 3: Test the Deployment

1. Push any changes to the `main` branch
2. GitHub Actions will automatically:
   - Install dependencies
   - Build the application
   - Deploy to Firebase Hosting
3. Check the **Actions** tab in your GitHub repository to monitor progress

## 🚀 How It Works

### Automatic Deployments

- **Production**: Pushes to `main` branch → Deploy to https://omni-shopping.web.app
- **Preview**: Pull requests → Deploy to preview URLs
- **Manual**: You can also run `npm run deploy:firebase` locally

### Current Configuration

- **Project ID**: `omni-shopping-4111b`
- **Site ID**: `omni-shopping`
- **Production URL**: https://omni-shopping.web.app
- **Firebase Console**: https://console.firebase.google.com/project/omni-shopping-4111b

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase (requires authentication)
npm run deploy:firebase
```

## 📁 Important Files

- `.firebaserc` - Firebase project configuration
- `firebase.json` - Firebase hosting configuration
- `.github/workflows/` - GitHub Actions workflows
- `public/` - Static files for Firebase hosting

## 🔒 Security

- The password for the live site is: `omni-shop-2024`
- Change this in `public/index.html` if needed
- Service account keys should never be committed to the repository

## 🌐 URLs

- **Production**: https://omni-shopping.web.app
- **Firebase Console**: https://console.firebase.google.com/project/omni-shopping-4111b
- **GitHub Repository**: https://github.com/emonterrubio/omni-shop
