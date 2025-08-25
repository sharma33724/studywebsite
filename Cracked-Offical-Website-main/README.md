# Prepify - Comprehensive Test Prep Platform

A professional test preparation platform for SAT and AP exams, built with React and Node.js.

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/sharma33724/studywebsite.git
cd studywebsite/Cracked-Offical-Website-main

# Install all dependencies (both frontend and backend)
npm run install-all
```

### 2. Database Setup
```bash
# Start MongoDB (Windows - should run automatically)
# Mac/Linux: sudo systemctl start mongod

# Create environment file
cd server
# Create .env file with the following content:
```

**Create `server/.env` file with:**
```env
MONGO_URI=mongodb://localhost:27017/prepify
JWT_SECRET=prepify_super_secret_jwt_key_2024_make_it_long_and_random_12345
JWT_EXPIRE=30d
NODE_ENV=development
PORT=5000
```

### 3. Start the Application

#### Option A: Start Both Frontend and Backend
```bash
# From the root directory
npm run dev
```

#### Option B: Start Separately
```bash
# Terminal 1 - Start Backend
npm run server

# Terminal 2 - Start Frontend  
npm run start:client
```

#### Option C: Windows Scripts
```bash
# Windows - Double click start-server.bat
# Or run in PowerShell:
.\start-server.ps1
```

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## 🛠️ Development Commands

```bash
# Install dependencies
npm run install-all

# Start backend only
npm run server

# Start frontend only
npm run start:client

# Start both (development)
npm run dev

# Build frontend for production
npm run build:client

# Build frontend
npm run build

# Start production server
npm start
```

## 🗄️ Database Features

✅ **Individual User Data**: Each user has separate progress and stats  
✅ **Progress Tracking**: Individual lesson and course progress  
✅ **Test Results**: Separate storage for each user's practice tests  
✅ **User Authentication**: JWT-based secure authentication  
✅ **Real-time Updates**: Live progress and score updates  

## 🌍 Local URLs & Testing

### Frontend Routes
- **Home:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Dashboard:** http://localhost:3000/dashboard
- **Courses:** http://localhost:3000/courses
- **Practice Tests:** http://localhost:3000/practice

### Backend API Endpoints
- **Health Check:** GET http://localhost:5000/api/health
- **Register:** POST http://localhost:5000/api/auth/register
- **Login:** POST http://localhost:5000/api/auth/login
- **User Profile:** GET http://localhost:5000/api/auth/me
- **Progress:** GET http://localhost:5000/api/progress
- **Update Progress:** POST http://localhost:5000/api/progress/lesson

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB with Mongoose ODM
- **Deployment:** Firebase Hosting (Frontend), Firebase Functions (Backend)

## 📚 Features

- **SAT Preparation:**
  - Practice tests with individual scoring
  - Progress tracking per user
  - Course management with completion tracking
  
- **AP Exam Preparation:**
  - Multiple AP subjects
  - Subject-specific practice
  - Advanced placement strategies
  
- **User Management:**
  - Individual user accounts
  - Personal progress tracking
  - Study statistics and analytics
  - Streak tracking and achievements

## 🚀 Deployment

### Firebase Hosting (Frontend)
```bash
# Build the React app
npm run build:client

# Deploy to Firebase
firebase deploy --only hosting
```

### Firebase Functions (Backend)
```bash
# Deploy backend functions
firebase deploy --only functions
```

## 📁 Project Structure
```
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   └── config/          # Frontend configuration
│   └── public/              # Static files
├── server/                   # Express backend
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── config/              # Database configuration
│   └── index.js             # Server entry point
├── start-server.bat         # Windows startup script
├── start-server.ps1         # PowerShell startup script
├── SETUP_DATABASE.md        # Database setup guide
└── package.json             # Root dependencies
```

## 🔧 Troubleshooting

### Common Issues:

1. **"MongoDB connection failed"**
   - Make sure MongoDB is installed and running
   - Check if the .env file exists in server directory

2. **"Port 5000 already in use"**
   - Kill the process: `npx kill-port 5000`
   - Or change PORT in .env file

3. **"Module not found" errors**
   - Run: `npm run install-all`
   - Delete node_modules and run install again

4. **Frontend stuck on loading**
   - Check if backend is running on port 5000
   - Check browser console for errors
   - Verify .env file exists

### Getting Help:
- Check the browser console (F12) for frontend errors
- Check the terminal for backend errors
- Verify all URLs are accessible

---

**Built with ❤️ for students preparing for SAT and AP exams worldwide** 