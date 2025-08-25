const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const admin = require('firebase-admin');
const db = admin.firestore();

// Get user progress for all courses
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // Get user progress
    const userProgressDoc = await db.collection('userProgress').doc(userId).get();
    
    if (!userProgressDoc.exists) {
      // Create new user progress
      await db.collection('userProgress').doc(userId).set({
        userId,
        courses: [],
        tests: [],
        totalStudyTime: 0,
        averageScore: 0,
        completedCourses: 0,
        completedTests: 0
      });
      
      return res.json({
        success: true,
        data: {
          overallProgress: 0,
          totalCourses: 0,
          completedCourses: 0,
          courses: [],
          practiceTests: [],
          totalStudyTime: 0,
          averageScore: 0
        }
      });
    }
    
    const userProgress = userProgressDoc.data();
    
    // Get enrolled courses with details
    const enrolledCourses = await Promise.all(
      (userProgress.courses || []).map(async (courseProgress) => {
        const courseDoc = await db.collection('courses').doc(courseProgress.courseId).get();
        const course = courseDoc.exists ? { id: courseDoc.id, ...courseDoc.data() } : null;
        
        return {
          ...courseProgress,
          course: course
        };
      })
    );
    
    // Calculate overall stats
    const totalCourses = userProgress.courses?.length || 0;
    const completedCourses = userProgress.courses?.filter(c => c.isCompleted)?.length || 0;
    const overallProgress = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
    
    res.json({
      success: true,
      data: {
        overallProgress,
        totalCourses,
        completedCourses,
        courses: enrolledCourses,
        practiceTests: userProgress.tests || [],
        totalStudyTime: userProgress.totalStudyTime || 0,
        averageScore: userProgress.averageScore || 0
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
    const userId = req.user.uid;
    
    const userProgressDoc = await db.collection('userProgress').doc(userId).get();
    
    if (!userProgressDoc.exists) {
      return res.json({
        success: true,
        data: []
      });
    }
    
    const userProgress = userProgressDoc.data();
    const courseProgress = userProgress.courses?.find(c => c.courseId === courseId);
    
    res.json({
      success: true,
      data: courseProgress ? [courseProgress] : []
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
    const userId = req.user.uid;
    
    const userProgressRef = db.collection('userProgress').doc(userId);
    const userProgressDoc = await userProgressRef.get();
    
    if (!userProgressDoc.exists) {
      return res.status(404).json({ message: 'User progress not found' });
    }
    
    const userProgress = userProgressDoc.data();
    const courseIndex = userProgress.courses?.findIndex(c => c.courseId === courseId);
    
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found in user progress' });
    }
    
    // Update course progress
    const updatedCourses = [...userProgress.courses];
    const courseProgress = updatedCourses[courseIndex];
    
    if (!courseProgress.completedLessons) {
      courseProgress.completedLessons = [];
    }
    
    const lessonIndex = courseProgress.completedLessons.findIndex(l => l.lessonId === lessonId);
    
    if (lessonIndex === -1) {
      // Add new lesson progress
      courseProgress.completedLessons.push({
        lessonId,
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        score: score || 0
      });
    } else {
      // Update existing lesson progress
      courseProgress.completedLessons[lessonIndex] = {
        ...courseProgress.completedLessons[lessonIndex],
        score: score || courseProgress.completedLessons[lessonIndex].score
      };
    }
    
    // Update overall progress
    const totalLessons = 24; // Assuming 24 lessons per course
    courseProgress.progress = Math.round((courseProgress.completedLessons.length / totalLessons) * 100);
    courseProgress.isCompleted = courseProgress.progress >= 100;
    
    // Update user progress
    await userProgressRef.update({
      courses: updatedCourses,
      totalStudyTime: admin.firestore.FieldValue.increment(timeSpent || 0)
    });
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: courseProgress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

module.exports = router;
