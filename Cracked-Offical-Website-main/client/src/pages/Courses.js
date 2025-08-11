import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'SAT Math Fundamentals',
      description: 'Master essential math concepts including algebra, geometry, and data analysis.',
      duration: '8 weeks',
      students: 2500,
      rating: 4.8,
      lessons: 24,
      category: 'Math'
    },
    {
      id: 2,
      title: 'SAT Reading Comprehension',
      description: 'Develop critical reading skills and strategies for the SAT Reading section.',
      duration: '6 weeks',
      students: 1800,
      rating: 4.7,
      lessons: 18,
      category: 'Reading'
    },
    {
      id: 3,
      title: 'SAT Writing & Language',
      description: 'Learn grammar rules, punctuation, and writing strategies for the SAT.',
      duration: '5 weeks',
      students: 2200,
      rating: 4.9,
      lessons: 20,
      category: 'Writing'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SAT & AP Preparation Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive courses designed to help you master every section of the SAT and AP exams to achieve your target scores.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-lg cursor-pointer group"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary-600" />
                </div>
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {course.lessons} lessons
                </span>
                <button className="btn-primary text-sm">
                  Start Course
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 