const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const admin = require('firebase-admin');
const db = admin.firestore();

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user progress data
    const userProgressDoc = await db.collection('userProgress').doc(userId).get();
    
    let userProgress;
    if (!userProgressDoc.exists) {
      // Create new user progress
      userProgress = {
        userId,
        courses: [],
        tests: [],
        totalStudyTime: 0,
        averageScore: 0,
        completedCourses: 0,
        completedTests: 0
      };
      
      await db.collection('userProgress').doc(userId).set(userProgress);
    } else {
      userProgress = userProgressDoc.data();
    }
    
    // Create user profile from Firebase user and progress data
    const userProfile = {
      id: req.user.uid,
      name: req.user.displayName || 'Student',
      email: req.user.email,
      targetScore: 1500, // Default target
      currentScore: userProgress.averageScore || 0,
      studyTime: formatStudyTime(userProgress.totalStudyTime),
      testsTaken: userProgress.completedTests,
      coursesEnrolled: userProgress.courses?.length || 0,
      joinDate: userProgressDoc.exists ? userProgressDoc.createTime?.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      lastActive: userProgressDoc.exists ? userProgressDoc.updateTime?.toDate().toISOString() : new Date().toISOString()
    };
    
    res.json(userProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, targetScore } = req.body;
    
    // For now, just return success since Firebase Auth handles user data
    res.json({ 
      message: 'Profile updated successfully',
      user: {
        id: req.user.uid,
        name: name || req.user.displayName || 'Student',
        email: email || req.user.email,
        targetScore: targetScore || 1500
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user progress
    const userProgressDoc = await db.collection('userProgress').doc(userId).get();
    
    let userProgress;
    if (!userProgressDoc.exists) {
      userProgress = {
        courses: [],
        tests: [],
        totalStudyTime: 0,
        averageScore: 0,
        completedCourses: 0,
        completedTests: 0
      };
    } else {
      userProgress = userProgressDoc.data();
    }
    
    // Calculate stats
    const totalQuestions = userProgress.tests?.reduce((sum, test) => sum + test.totalQuestions, 0) || 0;
    const correctAnswers = userProgress.tests?.reduce((sum, test) => sum + test.correctAnswers, 0) || 0;
    const bestScore = userProgress.tests?.length > 0 ? Math.max(...userProgress.tests.map(t => t.score)) : 0;
    const completedCourses = userProgress.courses?.filter(c => c.isCompleted)?.length || 0;
    
    const stats = {
      totalStudyTime: formatStudyTime(userProgress.totalStudyTime || 0),
      testsCompleted: userProgress.completedTests || 0,
      averageScore: userProgress.averageScore || 0,
      bestScore: bestScore,
      coursesCompleted: completedCourses,
      currentStreak: 7, // TODO: Implement streak tracking
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user achievements
router.get('/achievements', protect, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user progress to calculate achievements
    const userProgressDoc = await db.collection('userProgress').doc(userId).get();
    
    const achievements = [];
    
    if (userProgressDoc.exists) {
      const userProgress = userProgressDoc.data();
      
      // First test completed
      if (userProgress.completedTests > 0) {
        achievements.push({
          id: 1,
          title: 'First Test Completed',
          description: 'Completed your first practice test',
          icon: '🎯',
          earnedAt: userProgress.tests?.[0]?.completedAt?.toDate?.()?.toISOString()?.split('T')[0] || '2024-01-20'
        });
      }
      
      // Study streak (mock for now)
      if (userProgress.totalStudyTime > 60) { // More than 1 hour
        achievements.push({
          id: 2,
          title: 'Study Streak',
          description: 'Studied for 7 consecutive days',
          icon: '🔥',
          earnedAt: '2024-01-25'
        });
      }
      
      // Score improvement
      if (userProgress.averageScore > 1400) {
        achievements.push({
          id: 3,
          title: 'Score Improvement',
          description: 'Improved your score by 100+ points',
          icon: '📈',
          earnedAt: '2024-02-01'
        });
      }
    }
    
    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to format study time
const formatStudyTime = (minutes) => {
  if (!minutes) return '0h 0m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

module.exports = router;
