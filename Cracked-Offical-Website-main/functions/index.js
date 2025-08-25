const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const admin = require('firebase-admin');

// Initialize Firebase Admin with your existing project
admin.initializeApp({
  projectId: 'studywebsite-4f6b9'
});

// Initialize Firestore
const db = admin.firestore();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: true, // Allow all origins for Firebase Functions
  credentials: true
}));

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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Prepify API is running on Firebase Functions',
    timestamp: new Date().toISOString()
  });
});

// Simple API info endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Prepify API - Firebase Functions',
    endpoints: {
      health: '/api/health',
      courses: '/api/courses',
      practiceTests: '/api/practice-tests',
      progress: '/api/progress',
      users: '/api/users'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app); 