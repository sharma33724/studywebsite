import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, BarChart3, Play } from 'lucide-react';

const Practice = () => {
  const practiceTests = [
    {
      id: 1,
      title: 'SAT Math Practice Test #1',
      duration: '80 min',
      questions: 58,
      difficulty: 'Medium',
      category: 'Math'
    },
    {
      id: 2,
      title: 'SAT Reading Practice Test #1',
      duration: '65 min',
      questions: 52,
      difficulty: 'Hard',
      category: 'Reading'
    },
    {
      id: 3,
      title: 'SAT Writing Practice Test #1',
      duration: '35 min',
      questions: 44,
      difficulty: 'Medium',
      category: 'Writing'
    },
    {
      id: 4,
      title: 'Full SAT Practice Test #1',
      duration: '180 min',
      questions: 154,
      difficulty: 'Hard',
      category: 'Full Test'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Practice Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take realistic practice tests to assess your skills and track your progress towards your target score.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {practiceTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-lg cursor-pointer group"
            >
              <div className="relative">
                <div className="w-full h-32 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg mb-4 flex items-center justify-center">
                  <Target className="w-12 h-12 text-primary-600" />
                </div>
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {test.category}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {test.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{test.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{test.questions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`font-medium ${
                    test.difficulty === 'Easy' ? 'text-green-600' :
                    test.difficulty === 'Medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>
              </div>

              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Start Test</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Your Practice Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Clock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Time</h3>
              <p className="text-2xl font-bold text-primary-600">12h 45m</p>
            </div>
            <div className="card text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Tests Taken</h3>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="card text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Average Score</h3>
              <p className="text-2xl font-bold text-purple-600">1450</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Practice; 