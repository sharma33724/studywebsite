# 🚀 Firebase Deployment Guide

This guide will help you deploy your Prepify website to Firebase Hosting and Firebase Functions.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Firebase CLI** installed globally
3. **Firebase account** (free tier available)

## 🔧 Setup Firebase

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init
```

## 🏗️ Firebase Configuration

### Select Services:
- ✅ **Hosting** - For your React frontend
- ✅ **Functions** - For your Express backend
- ✅ **Firestore** - For database (optional, can keep MongoDB)

### Hosting Configuration:
- **Public directory:** `client/build`
- **Single-page app:** Yes
- **Overwrite index.html:** No

### Functions Configuration:
- **Language:** JavaScript
- **ESLint:** Yes
- **Install dependencies:** Yes

## 📁 Project Structure After Firebase Setup

```
├── client/              # React frontend
├── server/              # Express backend (will be moved to functions)
├── functions/           # Firebase Functions (your Express app)
├── public/              # Static files for hosting
├── firebase.json        # Firebase configuration
├── .firebaserc          # Firebase project settings
└── package.json         # Root dependencies
```

## 🔄 Convert Express App to Firebase Functions

### 1. Move server code to functions
```bash
# Copy server files to functions
cp -r server/* functions/
```

### 2. Update functions/package.json
```json
{
  "name": "functions",
  "version": "1.0.0",
  "main": "index.js",
  "engines": {
    "node": "18"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "firebase-admin": "^11.11.0"
  }
}
```

### 3. Update functions/index.js for Firebase Functions
```javascript
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: true }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const coursesRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const practiceTestsRoutes = require('./routes/practiceTests');
const usersRoutes = require('./routes/users');

// Use routes
app.use('/api/courses', coursesRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/practice-tests', practiceTestsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Prepify API is running on Firebase Functions',
    timestamp: new Date().toISOString()
  });
});

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
```

## 🚀 Deploy to Firebase

### 1. Build the React app
```bash
npm run build:client
```

### 2. Deploy everything
```bash
firebase deploy
```

### 3. Deploy specific services
```bash
firebase deploy --only hosting    # Frontend only
firebase deploy --only functions  # Backend only
```

## 🌐 Access Your Deployed App

After deployment, Firebase will provide you with:
- **Frontend URL:** `https://your-project-id.web.app`
- **API URL:** `https://your-region-your-project-id.cloudfunctions.net/api`

## 🔧 Environment Variables

### 1. Set Firebase environment variables
```bash
firebase functions:config:set mongodb.uri="your-mongodb-connection-string"
firebase functions:config:set jwt.secret="your-jwt-secret"
```

### 2. Access in your code
```javascript
const functions = require('firebase-functions');
const mongoUri = functions.config().mongodb.uri;
const jwtSecret = functions.config().jwt.secret;
```

## 📱 Update Frontend Configuration

Update `client/src/config/axios.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  'https://your-region-your-project-id.cloudfunctions.net/api';
```

## 🧪 Test Your Deployment

1. **Frontend:** Visit your Firebase hosting URL
2. **API:** Test `/api/health` endpoint
3. **Authentication:** Test login/register functionality
4. **Database:** Verify data persistence

## 💰 Firebase Pricing (Free Tier)

- **Hosting:** 10GB storage, 360MB/day transfer
- **Functions:** 2 million invocations/month
- **Firestore:** 1GB storage, 50K reads/day, 20K writes/day

## 🚨 Common Issues & Solutions

### Issue: Functions timeout
**Solution:** Increase timeout in firebase.json
```json
{
  "functions": {
    "timeoutSeconds": 540
  }
}
```

### Issue: CORS errors
**Solution:** Ensure CORS is properly configured in functions
```javascript
app.use(cors({ origin: true }));
```

### Issue: Environment variables not working
**Solution:** Use Firebase Functions config
```bash
firebase functions:config:get
```

## 📚 Next Steps

1. **Custom Domain:** Add your own domain to Firebase
2. **SSL Certificate:** Automatically handled by Firebase
3. **CDN:** Global CDN included with Firebase Hosting
4. **Analytics:** Integrate Firebase Analytics
5. **Performance:** Monitor with Firebase Performance

---

**🎉 Congratulations! Your Prepify website is now live on Firebase!**
