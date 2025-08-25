const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all practice tests
router.get('/', async (req, res) => {
  try {
    const testsSnapshot = await db.collection('practiceTests').where('isActive', '==', true).get();
    const tests = [];
    
    testsSnapshot.forEach(doc => {
      tests.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(tests);
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get practice test by ID
router.get('/:id', async (req, res) => {
  try {
    const testDoc = await db.collection('practiceTests').doc(req.params.id).get();
    
    if (!testDoc.exists) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    
    res.json({
      id: testDoc.id,
      ...testDoc.data()
    });
  } catch (error) {
    console.error('Get test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start a practice test
router.post('/:id/start', protect, async (req, res) => {
  try {
    const testDoc = await db.collection('practiceTests').doc(req.params.id).get();
    
    if (!testDoc.exists) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    
    res.json({ 
      message: 'Test started successfully',
      testId: testDoc.id,
      startTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('Start test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit practice test results
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const testDoc = await db.collection('practiceTests').doc(req.params.id).get();
    
    if (!testDoc.exists) {
      return res.status(404).json({ message: 'Practice test not found' });
    }
    
    const test = {
      id: testDoc.id,
      ...testDoc.data()
    };
    
    // Calculate score based on answers
    let correctAnswers = 0;
    const totalQuestions = test.questions.length;
    
    answers.forEach(answer => {
      const question = test.questions.find(q => q.id === answer.questionId);
      if (question && question.correct === answer.selectedAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 1600); // Scale to SAT score
    
    // Save test result
    const userProgressRef = db.collection('userProgress').doc(req.user.uid);
    const userProgressDoc = await userProgressRef.get();
    
    const testResult = {
      testId: test.id,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      answers,
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    if (userProgressDoc.exists) {
      const userProgress = userProgressDoc.data();
      const updatedTests = [...(userProgress.tests || []), testResult];
      
      // Calculate new average score
      const totalScore = updatedTests.reduce((sum, t) => sum + t.score, 0);
      const newAverageScore = Math.round(totalScore / updatedTests.length);
      
      await userProgressRef.update({
        tests: updatedTests,
        averageScore: newAverageScore,
        completedTests: updatedTests.length,
        totalStudyTime: admin.firestore.FieldValue.increment(timeSpent || 0)
      });
    } else {
      // Create new user progress
      await userProgressRef.set({
        userId: req.user.uid,
        courses: [],
        tests: [testResult],
        totalStudyTime: timeSpent || 0,
        averageScore: score,
        completedCourses: 0,
        completedTests: 1
      });
    }
    
    res.json({ 
      message: 'Test submitted successfully',
      testId: test.id,
      score,
      correctAnswers,
      totalQuestions,
      timeSpent,
      submittedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
