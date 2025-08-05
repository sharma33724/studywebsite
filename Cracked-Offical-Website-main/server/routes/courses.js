const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Mock course data - in a real app, this would come from a database
const courses = [
  {
    id: 1,
    title: 'SAT Math Fundamentals',
    description: 'Master the essential math concepts tested on the SAT',
    duration: '8 weeks',
    level: 'Beginner',
    topics: ['Algebra', 'Geometry', 'Data Analysis'],
    price: 99.99,
    image: '/images/math-course.jpg'
  },
  {
    id: 2,
    title: 'SAT Reading & Writing',
    description: 'Improve your reading comprehension and writing skills',
    duration: '6 weeks',
    level: 'Intermediate',
    topics: ['Reading Comprehension', 'Grammar', 'Essay Writing'],
    price: 89.99,
    image: '/images/reading-course.jpg'
  },
  {
    id: 3,
    title: 'SAT Advanced Strategies',
    description: 'Advanced techniques and time management strategies',
    duration: '4 weeks',
    level: 'Advanced',
    topics: ['Test Strategies', 'Time Management', 'Advanced Problem Solving'],
    price: 129.99,
    image: '/images/advanced-course.jpg'
  }
];

// Get all courses
router.get('/', async (req, res) => {
  try {
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in a course (requires authentication)
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // In a real app, you would save enrollment to database
    res.json({ 
      message: 'Successfully enrolled in course',
      course: course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 