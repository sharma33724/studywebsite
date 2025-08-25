const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Progress = require('../models/Progress');
const PracticeTestResult = require('../models/PracticeTestResult');
const User = require('../models/User');

// Get user progress for all courses
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all progress records for the user
    const progress = await Progress.find({ userId }).sort({ updatedAt: -1 });
    
    // Get practice test results
    const testResults = await PracticeTestResult.find({ userId })
      .sort({ completedAt: -1 })
      .limit(10);
    
    // Calculate overall stats
    const totalLessons = progress.length;
    const completedLessons = progress.filter(p => p.status === 'completed').length;
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    res.json({
      success: true,
      data: {
        overallProgress,
        totalLessons,
        completedLessons,
        courses: progress,
        practiceTests: testResults
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Get progress for a specific course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    
    const progress = await Progress.find({ 
      userId, 
      courseId 
    }).sort({ lessonId: 1 });
    
    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Update lesson progress
router.post('/lesson', protect, async (req, res) => {
  try {
    const { courseId, lessonId, status, score, timeSpent } = req.body;
    const userId = req.user.id;
    
    // Find existing progress or create new
    let progress = await Progress.findOne({ userId, courseId, lessonId });
    
    if (progress) {
      // Update existing progress
      progress.status = status;
      progress.score = score || progress.score;
      progress.timeSpent += timeSpent || 0;
      progress.attempts += 1;
      progress.lastAttempt = new Date();
      
      if (status === 'completed') {
        progress.completedAt = new Date();
      }
    } else {
      // Create new progress record
      progress = new Progress({
        userId,
        courseId,
        lessonId,
        status,
        score: score || 0,
        timeSpent: timeSpent || 0,
        attempts: 1,
        lastAttempt: new Date()
      });
      
      if (status === 'completed') {
        progress.completedAt = new Date();
      }
    }
    
    await progress.save();
    
    // Update user stats if lesson completed
    if (status === 'completed' && score) {
      const user = await User.findById(userId);
      if (user) {
        user.updateStudyStats(timeSpent || 0, score);
        await user.save();
      }
    }
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Save practice test results
router.post('/practice-test', protect, async (req, res) => {
  try {
    const {
      testId,
      testName,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      timeSpent,
      sections,
      answers,
      startedAt,
      completedAt
    } = req.body;
    
    const userId = req.user.id;
    
    // Create new test result
    const testResult = new PracticeTestResult({
      userId,
      testId,
      testName,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      timeSpent,
      sections,
      answers,
      startedAt: new Date(startedAt),
      completedAt: new Date(completedAt)
    });
    
    await testResult.save();
    
    // Update user stats
    const user = await User.findById(userId);
    if (user) {
      user.updateStudyStats(timeSpent, score);
      await user.save();
    }
    
    res.json({
      success: true,
      message: 'Test results saved successfully',
      data: testResult
    });
  } catch (error) {
    console.error('Save test results error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Get practice test history
router.get('/practice-tests', protect, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const testResults = await PracticeTestResult.find({ userId })
      .sort({ completedAt: -1 })
      .select('testId testName score totalQuestions correctAnswers timeSpent completedAt');
    
    res.json({
      success: true,
      data: testResults
    });
  } catch (error) {
    console.error('Get test history error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router; 