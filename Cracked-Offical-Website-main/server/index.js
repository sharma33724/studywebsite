const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Build React app if in production and build doesn't exist
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  if (!fs.existsSync(buildPath)) {
    console.log('🛠️ Building React app for production...');
    try {
      // Try using npx to avoid permission issues
      execSync('cd client && npx react-scripts build', { stdio: 'inherit' });
      console.log('✅ React app built successfully');
    } catch (error) {
      console.error('❌ Failed to build React app:', error.message);
      console.log('⚠️ Running in API-only mode');
    }
  }
}

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
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL, 
        'https://crackd-official.onrender.com',
        /^https:\/\/.*\.vercel\.app$/
      ]
    : ['http://localhost:3000'],
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
    message: 'Crackd Official API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  const indexPath = path.join(buildPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    // Serve static files from the React build directory
    app.use(express.static(buildPath));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    // Fallback: API-only mode with simple HTML response
    app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Crackd Official - SAT Prep Platform</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 600px; margin: 0 auto; }
            .logo { font-size: 2em; color: #2563eb; margin-bottom: 20px; }
            .status { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .api-link { color: #2563eb; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">📚 Crackd Official</div>
            <h1>SAT Prep Platform</h1>
            <div class="status">
              <h2>🚀 Server is Running!</h2>
              <p>Your backend API is successfully deployed on Render.</p>
              <p><a href="/api/health" class="api-link">Check API Health</a></p>
            </div>
            <p>Frontend build is being optimized. Check back soon!</p>
          </div>
        </body>
        </html>
      `);
    });
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Crackd Official server running on port ${PORT}`);
  console.log(`📚 SAT Prep Platform - Ready for students!`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 