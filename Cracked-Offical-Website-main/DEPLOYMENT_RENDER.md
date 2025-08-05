# 🚀 Crackd Official - Render Deployment Guide

## 📋 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Your code should be on GitHub
3. **MongoDB Atlas Account** - For database (free tier available)

## 🔧 Step-by-Step Deployment

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/crackd-official`)

### Step 2: Render Setup

1. **Log into Render Dashboard**
2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository: `sharma33724/Cracked-Offical-Website`

3. **Configure the Service:**
   - **Name:** `crackd-official-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-key-here
   FRONTEND_URL=https://crackd-official.onrender.com
   ```

### Step 3: Deploy Frontend (Optional)

You can also deploy the frontend separately:

1. **Create Static Site:**
   - Click "New +" → "Static Site"
   - Connect same GitHub repository
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/build`

2. **Set Environment Variables:**
   ```
   REACT_APP_API_URL=https://crackd-official-api.onrender.com
   ```

### Step 4: Deploy

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Render will automatically deploy** when it detects changes

3. **Check logs** for any errors

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

2. **Port issues:**
   - Render assigns specific ports
   - Use `process.env.PORT` in your code

3. **Database connection:**
   - Verify MongoDB Atlas connection string
   - Check network access settings

4. **Static files not serving:**
   - Ensure React build is in `client/build/`
   - Check file permissions

## 🌐 Custom Domain Setup

1. **In Render Dashboard:**
   - Go to your service settings
   - Click "Custom Domains"
   - Add your domain
   - Update DNS settings with your domain provider

2. **Update Environment Variables:**
   - Change `FRONTEND_URL` to your custom domain

## 📊 Monitoring

- **Logs:** Available in Render dashboard
- **Health Check:** Visit `/api/health` endpoint
- **Performance:** Monitor in Render analytics

## 🔄 Updates

To update your site:
1. Push changes to GitHub
2. Render will automatically redeploy
3. Or manually trigger deployment in dashboard

## 💰 Costs

- **Render:** Free tier available (750 hours/month)
- **MongoDB Atlas:** Free tier (512MB)
- **Custom Domain:** ~$10-15/year

## 🆘 Support

- **Render Support:** Available in dashboard
- **MongoDB Atlas:** 24/7 support
- **GitHub Issues:** For code-related problems

---

**Your site will be live at:** `https://crackd-official-api.onrender.com` 