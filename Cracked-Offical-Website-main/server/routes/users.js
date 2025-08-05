const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock user data - in a real app, this would come from a database
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  targetScore: 1500,
  currentScore: 1450,
  studyTime: '24h 30m',
  testsTaken: 12,
  coursesEnrolled: 3,
  joinDate: '2024-01-15',
  lastActive: new Date().toISOString()
};

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    // In a real app, you would fetch user data from database based on req.user.id
    res.json(mockUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, targetScore } = req.body;
    
    // In a real app, you would update user data in database
    res.json({ 
      message: 'Profile updated successfully',
      user: {
        ...mockUser,
        name: name || mockUser.name,
        email: email || mockUser.email,
        targetScore: targetScore || mockUser.targetScore
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = {
      totalStudyTime: '24h 30m',
      testsCompleted: 12,
      averageScore: 1450,
      bestScore: 1520,
      coursesCompleted: 1,
      currentStreak: 7,
      totalQuestions: 1848,
      correctAnswers: 1478
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user achievements
router.get('/achievements', protect, async (req, res) => {
  try {
    const achievements = [
      {
        id: 1,
        title: 'First Test Completed',
        description: 'Completed your first practice test',
        icon: '🎯',
        earnedAt: '2024-01-20'
      },
      {
        id: 2,
        title: 'Study Streak',
        description: 'Studied for 7 consecutive days',
        icon: '🔥',
        earnedAt: '2024-01-25'
      },
      {
        id: 3,
        title: 'Score Improvement',
        description: 'Improved your score by 100+ points',
        icon: '📈',
        earnedAt: '2024-02-01'
      }
    ];
    
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 