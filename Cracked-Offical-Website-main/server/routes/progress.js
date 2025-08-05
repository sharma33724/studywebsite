const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock progress data - in a real app, this would come from a database
const mockProgress = {
  userId: 1,
  courses: [
    {
      courseId: 1,
      progress: 60,
      completedLessons: 12,
      totalLessons: 20,
      lastAccessed: new Date().toISOString()
    },
    {
      courseId: 2,
      progress: 30,
      completedLessons: 6,
      totalLessons: 20,
      lastAccessed: new Date().toISOString()
    }
  ],
  practiceTests: [
    {
      testId: 1,
      score: 1450,
      completedAt: new Date().toISOString(),
      timeSpent: '2 hours 30 minutes'
    },
    {
      testId: 2,
      score: 1520,
      completedAt: new Date().toISOString(),
      timeSpent: '2 hours 45 minutes'
    }
  ]
};

// Get user progress
router.get('/', protect, async (req, res) => {
  try {
    // In a real app, you would fetch progress from database based on req.user.id
    res.json(mockProgress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course progress
router.post('/course/:courseId', protect, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress, completedLessons } = req.body;
    
    // In a real app, you would update progress in database
    res.json({ 
      message: 'Progress updated successfully',
      courseId,
      progress,
      completedLessons
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Save practice test results
router.post('/practice-test', protect, async (req, res) => {
  try {
    const { testId, score, timeSpent } = req.body;
    
    // In a real app, you would save results to database
    res.json({ 
      message: 'Test results saved successfully',
      testId,
      score,
      timeSpent
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 