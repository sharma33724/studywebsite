# Prepify - Comprehensive Test Prep Platform

A professional test preparation platform for SAT and AP exams, built with React and Node.js.

## 🚀 Quick Start (Local Development)

### Option 1: Simple Server Start
```bash
# Start backend server on port 5000
node server/index.js

# In another terminal, start frontend on port 3000
npm run start:client
```

### Option 2: Using Scripts
```bash
# Windows - Double click start-server.bat or run:
start-server.bat

# PowerShell - Run:
.\start-server.ps1

# Or use npm scripts:
npm run start          # Start backend
npm run start:client  # Start frontend
npm run dev           # Start both simultaneously
```

## 🌍 Local URLs
- **Backend API:** http://localhost:5000
- **Frontend:** http://localhost:3000
- **API Health Check:** http://localhost:5000/api/health

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB
- **Deployment:** Firebase Hosting (Frontend), Firebase Functions (Backend)

## 📚 Features

- **SAT Preparation:**
  - Practice tests
  - Progress tracking
  - Course management
  
- **AP Exam Preparation:**
  - Multiple AP subjects
  - Subject-specific practice
  - Advanced placement strategies
  
- **General Features:**
  - User authentication
  - Real-time updates
  - Comprehensive analytics

## 🚀 Deployment

### Firebase Hosting (Frontend)
- Build the React app: `npm run build:client`
- Deploy to Firebase: `firebase deploy`

### Firebase Functions (Backend)
- Convert Express app to Firebase Functions
- Deploy with: `firebase deploy --only functions`

## 📁 Project Structure
```
├── client/          # React frontend
├── server/          # Express backend
├── start-server.bat # Windows startup script
├── start-server.ps1 # PowerShell startup script
└── package.json     # Root dependencies
```

---

**Built with ❤️ for students preparing for SAT and AP exams worldwide** 