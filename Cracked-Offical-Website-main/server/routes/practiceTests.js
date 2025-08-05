const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock practice test data - in a real app, this would come from a database
const practiceTests = [
  {
    id: 1,
    title: 'SAT Practice Test #1',
    description: 'Full-length SAT practice test with realistic questions',
    duration: '3 hours',
    questions: 154,
    sections: ['Reading', 'Writing & Language', 'Math (No Calculator)', 'Math (Calculator)'],
    difficulty: 'Medium',
    isCompleted: false
  },
  {
    id: 2,
    title: 'SAT Practice Test #2',
    description: 'Advanced SAT practice test with challenging questions',
    duration: '3 hours',
    questions: 154,
    sections: ['Reading', 'Writing & Language', 'Math (No Calculator)', 'Math (Calculator)'],
    difficulty: 'Hard',
    isCompleted: true
  },
  {
    id: 3,
    title: 'SAT Math Focus Test',
    description: 'Math-focused practice test covering all math concepts',
    duration: '1 hour 30 minutes',
    questions: 58,
    sections: ['Math (No Calculator)', 'Math (Calculator)'],
    difficulty: 'Medium',
    isCompleted: false
  }
];

// Get all practice tests
router.get('/', async (req, res) => {
  try {
    res.json(practiceTests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get practice test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = practiceTests.find(t => t.id === parseInt(req.params.id));
    if (!test) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start a practice test
router.post('/:id/start', protect, async (req, res) => {
  try {
    const test = practiceTests.find(t => t.id === parseInt(req.params.id));
    if (!test) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    
    // In a real app, you would create a test session
    res.json({ 
      message: 'Test started successfully',
      testId: test.id,
      startTime: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit practice test results
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const test = practiceTests.find(t => t.id === parseInt(req.params.id));
    
    if (!test) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    
    // Mock score calculation - in a real app, you would calculate based on answers
    const score = Math.floor(Math.random() * 400) + 1200; // Random score between 1200-1600
    
    res.json({ 
      message: 'Test submitted successfully',
      testId: test.id,
      score,
      timeSpent,
      submittedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 