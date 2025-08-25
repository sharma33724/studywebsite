# 🚀 Quick Deploy to Your Existing Firebase Project

## **Your Firebase Project: `studywebsite-4f6b9`**

### **Step 1: Enable Firestore Database**
1. Go to [Firebase Console](https://console.firebase.google.com/project/studywebsite-4f6b9)
2. Click "Firestore Database" in left sidebar
3. Click "Create Database"
4. Choose "Start in test mode" (for development)
5. Select a location (choose closest to your users)

### **Step 2: Enable Authentication**
1. Go to "Authentication" in left sidebar
2. Click "Get Started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### **Step 3: Add Sample Data to Firestore**

#### **Add Courses Collection:**
Go to Firestore → Data → Start collection → Collection ID: `courses`

**Document 1:**
```json
{
  "title": "SAT Math Fundamentals",
  "description": "Master essential math concepts including algebra, geometry, and data analysis.",
  "duration": "8 weeks",
  "students": 2500,
  "rating": 4.8,
  "lessons": 24,
  "category": "Math",
  "price": 0,
  "image": "/images/math-course.jpg",
  "isActive": true,
  "content": [
    {"id": 1, "title": "Algebra Basics", "duration": "45 min", "type": "video"},
    {"id": 2, "title": "Geometry Fundamentals", "duration": "60 min", "type": "video"},
    {"id": 3, "title": "Data Analysis", "duration": "30 min", "type": "quiz"}
  ]
}
```

**Document 2:**
```json
{
  "title": "SAT Reading Comprehension",
  "description": "Develop critical reading skills and strategies for the SAT Reading section.",
  "duration": "6 weeks",
  "students": 1800,
  "rating": 4.7,
  "lessons": 18,
  "category": "Reading",
  "price": 0,
  "image": "/images/reading-course.jpg",
  "isActive": true,
  "content": [
    {"id": 1, "title": "Reading Strategies", "duration": "40 min", "type": "video"},
    {"id": 2, "title": "Passage Analysis", "duration": "50 min", "type": "video"},
    {"id": 3, "title": "Vocabulary Building", "duration": "35 min", "type": "quiz"}
  ]
}
```

#### **Add Practice Tests Collection:**
Go to Firestore → Data → Start collection → Collection ID: `practiceTests`

**Document 1:**
```json
{
  "title": "SAT Math Practice Test 1",
  "description": "Full-length math practice test with 58 questions",
  "duration": 80,
  "questions": 58,
  "category": "Math",
  "difficulty": "Medium",
  "isActive": true,
  "passingScore": 70,
  "questions": [
    {
      "id": 1,
      "question": "If 2x + 3 = 11, what is the value of x?",
      "options": ["2", "3", "4", "5"],
      "correct": 2,
      "explanation": "Subtract 3 from both sides: 2x = 8, then divide by 2: x = 4"
    },
    {
      "id": 2,
      "question": "What is the area of a circle with radius 5?",
      "options": ["25π", "50π", "75π", "100π"],
      "correct": 0,
      "explanation": "Area = πr² = π(5)² = 25π"
    }
  ]
}
```

### **Step 4: Deploy Everything**

#### **Option A: Use the Deployment Script (Recommended)**
```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

#### **Option B: Manual Deployment**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Install dependencies
cd functions && npm install && cd ..

# Deploy everything
firebase deploy
```

### **Step 5: Your Website is Live!**

🌍 **Website**: https://studywebsite-4f6b9.web.app  
🔗 **API**: https://us-central1-studywebsite-4f6b9.cloudfunctions.net/api  

### **Step 6: Test Your Website**

1. **Visit**: https://studywebsite-4f6b9.web.app
2. **Register/Login** using email and password
3. **Browse courses** and enroll
4. **Take practice tests** and see your progress
5. **Check your dashboard** for stats

### **Features Working:**
✅ User registration/login  
✅ Course browsing and enrollment  
✅ Practice test taking  
✅ Progress tracking  
✅ User dashboard  
✅ Real-time database  

### **Next Steps:**
1. Add your custom domain
2. Add more courses and tests
3. Set up analytics
4. Start marketing!

**🎉 Your SAT prep platform is now live on your existing Firebase project!**
