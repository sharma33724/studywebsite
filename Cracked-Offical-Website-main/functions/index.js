const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000; // Fixed port for simplicity

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
  origin: ['http://localhost:3000', 'http://localhost:5000'],
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
    message: 'Prepify API is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Serve static files from React build (if exists)
const buildPath = path.join(__dirname, '../client/build');
if (require('fs').existsSync(buildPath)) {
  app.use(express.static(buildPath));
  
  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // Simple fallback for development
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Prepify - Comprehensive Test Prep Platform</title>
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
          <div class="logo">📚 Prepify</div>
          <h1>Comprehensive Test Prep Platform</h1>
          <div class="status">
            <h2>🚀 Server is Running!</h2>
            <p>Your backend API is running on port ${PORT}</p>
            <p><a href="/api/health" class="api-link">Check API Health</a></p>
          </div>
          <p>Prepare for SAT and AP exams with confidence!</p>
          <p>For development, run the React app separately on port 3000</p>
        </div>
      </body>
      </html>
    `);
  });
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
  console.log(`🚀 Prepify server running on port ${PORT}`);
  console.log(`📚 Comprehensive Test Prep Platform - Ready for students!`);
  console.log(`🌍 API available at: http://localhost:${PORT}/api`);
  console.log(`📖 Frontend: http://localhost:3000 (run 'npm run start:client' in another terminal)`);
}); 