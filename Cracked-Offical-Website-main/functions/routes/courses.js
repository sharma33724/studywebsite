const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const admin = require('firebase-admin');
const db = admin.firestore();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const coursesSnapshot = await db.collection('courses').where('isActive', '==', true).get();
    const courses = [];
    
    coursesSnapshot.forEach(doc => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const courseDoc = await db.collection('courses').doc(req.params.id).get();
    
    if (!courseDoc.exists) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({
      id: courseDoc.id,
      ...courseDoc.data()
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course (requires authentication)
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const courseDoc = await db.collection('courses').doc(req.params.id).get();
    
    if (!courseDoc.exists) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const course = {
      id: courseDoc.id,
      ...courseDoc.data()
    };
    
    // Check if user is already enrolled
    const userProgressRef = db.collection('userProgress').doc(req.user.uid);
    const userProgressDoc = await userProgressRef.get();
    
    if (userProgressDoc.exists) {
      const userProgress = userProgressDoc.data();
      const alreadyEnrolled = userProgress.courses?.some(c => c.courseId === course.id);
      
      if (!alreadyEnrolled) {
        await userProgressRef.update({
          courses: admin.firestore.FieldValue.arrayUnion({
            courseId: course.id,
            enrolledAt: admin.firestore.FieldValue.serverTimestamp()
          })
        });
      }
    } else {
      // Create new user progress
      await userProgressRef.set({
        userId: req.user.uid,
        courses: [{
          courseId: course.id,
          enrolledAt: admin.firestore.FieldValue.serverTimestamp()
        }],
        tests: [],
        totalStudyTime: 0,
        averageScore: 0,
        completedCourses: 0,
        completedTests: 0
      });
    }
    
    res.json({ 
      message: 'Successfully enrolled in course',
      course: course
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
