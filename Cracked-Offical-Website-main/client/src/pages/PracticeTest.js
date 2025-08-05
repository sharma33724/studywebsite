import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const PracticeTest = () => {
  // Placeholder data for a practice test
  const questions = [
    {
      id: 1,
      question: 'What is the value of x if 2x + 3 = 11?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      userAnswer: null
    },
    {
      id: 2,
      question: 'Which of the following is a prime number?',
      options: ['4', '6', '9', '7'],
      answer: 3,
      userAnswer: null
    },
    {
      id: 3,
      question: 'If y = 3x and x = 2, what is the value of y?',
      options: ['5', '6', '7', '8'],
      answer: 1,
      userAnswer: null
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SAT Practice Test
          </h1>
          <p className="text-gray-600">
            Answer the following questions to test your SAT skills.
          </p>
        </motion.div>

        <div className="space-y-8">
          {questions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card"
            >
              <div className="mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">Question {idx + 1}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{q.question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    className={`w-full px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                      q.userAnswer === i
                        ? 'bg-primary-100 border-primary-600 text-primary-900' :
                        'bg-white border-gray-200 text-gray-900 hover:bg-primary-50'
                    }`}
                    // onClick={() => handleAnswer(q.id, i)}
                    disabled={q.userAnswer !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="btn-primary px-8 py-3 text-lg">
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest; 