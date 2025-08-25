# Database Setup Guide for Prepify

## Quick Setup

### 1. Install MongoDB
- **Windows**: Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: `sudo apt install mongodb`

### 2. Start MongoDB
- **Windows**: MongoDB runs as a service automatically
- **Mac/Linux**: `sudo systemctl start mongod` or `brew services start mongodb-community`

### 3. Create Environment File
Create `server/.env` file with:
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/prepify

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_random_12345
JWT_EXPIRE=30d

# Server Configuration
NODE_ENV=development
PORT=5000
```

### 4. Install Dependencies
```bash
npm run install-all
```

### 5. Start the Backend
```bash
npm run server
```

## What This Fixes

✅ **Individual User Data**: Each user now has their own progress, stats, and test results  
✅ **Database Storage**: All data is stored in MongoDB instead of memory  
✅ **User Authentication**: Proper JWT-based authentication system  
✅ **Progress Tracking**: Individual lesson and course progress tracking  
✅ **Test Results**: Separate storage for each user's practice test results  
✅ **User Stats**: Individual study time, scores, and streaks  

## Database Models Created

- **User**: User accounts with individual stats
- **Progress**: Individual lesson progress tracking
- **PracticeTestResult**: Individual test results storage

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/progress` - Get user progress
- `POST /api/progress/lesson` - Update lesson progress
- `POST /api/progress/practice-test` - Save test results

## Testing the Setup

1. Start the server: `npm run server`
2. Register a new user at `POST /api/auth/register`
3. Login at `POST /api/auth/login`
4. Check that each user has separate data

Your users will now have completely separate progress, stats, and test results! 🎉
