# Vercel Deployment Guide

This project is deployed on Vercel with automatic deployments from GitHub.

## 🚀 How It Works

### **Automatic Deployment**
- Every push to the `main` branch automatically deploys to Vercel
- Pull requests create preview deployments
- No manual deployment needed

### **Current URLs**
- **Production**: https://omni-shop-*.vercel.app (auto-generated)
- **Preview**: https://omni-shop-*.vercel.app (for PRs)

## 🔐 Password Protection

The application is protected with a password system:

### **Current Password**: `omni-shop-2024`

### **To Change Password**:
1. Edit `src/config/auth.ts`
2. Change the `ACCESS_PASSWORD` value
3. Push to GitHub
4. Vercel will automatically deploy the changes

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

- `src/` - Source code
- `src/components/` - React components
- `src/app/` - Next.js app router pages
- `src/config/auth.ts` - Password configuration
- `public/` - Static assets

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Dependencies and scripts
- `.vercel/` - Vercel deployment configuration

## 🌐 Deployment

### **Automatic (Recommended)**
- Push to `main` branch → Auto-deploy to production
- Create PR → Auto-deploy to preview

### **Manual (if needed)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔒 Security Features

- **Password Protection**: Front-end authentication
- **Session Management**: Local storage persistence
- **Logout Functionality**: Secure session termination

## 📱 Features

- **Product Catalog**: Browse IT equipment
- **Shopping Cart**: Add/remove items
- **Product Comparison**: Compare specifications
- **Responsive Design**: Mobile and desktop optimized
- **Modern UI**: Built with Tailwind CSS and ShadCN

## 🆘 Support

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/emonterrubio/omni-shop
- **Local Development**: Run `npm run dev` for development server
