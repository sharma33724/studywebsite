import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  RefreshCw
} from 'lucide-react';

const Results = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock results data - in a real app, this would come from an API
    const mockResults = {
      testId: testId || '1',
      testName: 'SAT Practice Test #1',
      date: new Date().toLocaleDateString(),
      totalQuestions: 154,
      correctAnswers: 127,
      incorrectAnswers: 20,
      skipped: 7,
      score: 820,
      timeSpent: '2 hours 45 minutes',
      sections: [
        {
          name: 'Reading',
          questions: 52,
          correct: 42,
          score: 680
        },
        {
          name: 'Writing & Language',
          questions: 44,
          correct: 38,
          score: 720
        },
        {
          name: 'Math (No Calculator)',
          questions: 20,
          correct: 18,
          score: 750
        },
        {
          name: 'Math (Calculator)',
          questions: 38,
          correct: 29,
          score: 690
        }
      ]
    };

    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [testId]);

  const getScoreColor = (score) => {
    if (score >= 1400) return 'text-green-600';
    if (score >= 1200) return 'text-blue-600';
    if (score >= 1000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracy = (correct, total) => {
    return Math.round((correct / total) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
            <button
              onClick={() => navigate('/practice')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Another Test
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Test Name</h3>
              <p className="text-gray-600">{results.testName}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Date</h3>
              <p className="text-gray-600">{results.date}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700">Time Spent</h3>
              <p className="text-gray-600">{results.timeSpent}</p>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Score</h2>
            <div className={`text-6xl font-bold ${getScoreColor(results.score)} mb-2`}>
              {results.score}
            </div>
            <p className="text-gray-600 text-lg">out of 1600</p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-600">{results.correctAnswers}</span>
                </div>
                <p className="text-gray-600">Correct</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="h-6 w-6 text-red-600 mr-2" />
                  <span className="text-2xl font-bold text-red-600">{results.incorrectAnswers}</span>
                </div>
                <p className="text-gray-600">Incorrect</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-yellow-600 mr-2" />
                  <span className="text-2xl font-bold text-yellow-600">{results.skipped}</span>
                </div>
                <p className="text-gray-600">Skipped</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${getAccuracy(results.correctAnswers, results.totalQuestions)}%` }}
                ></div>
              </div>
              <p className="text-gray-600">
                Accuracy: {getAccuracy(results.correctAnswers, results.totalQuestions)}%
              </p>
            </div>
          </div>
        </div>

        {/* Section Scores */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Section Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.sections.map((section, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                  <span className={`text-xl font-bold ${getScoreColor(section.score)}`}>
                    {section.score}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{section.questions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Correct:</span>
                    <span className="font-medium text-green-600">{section.correct}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-medium">{getAccuracy(section.correct, section.questions)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Target className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Focus Areas</h3>
                <p className="text-gray-600">
                  Based on your performance, we recommend focusing on Math (Calculator) section 
                  where you scored 690. Consider reviewing algebra and geometry concepts.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Strengths</h3>
                <p className="text-gray-600">
                  Your Reading and Math (No Calculator) sections show strong performance. 
                  Keep practicing these areas to maintain your edge.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900">Next Steps</h3>
                <p className="text-gray-600">
                  Take more practice tests to improve your overall score. Consider enrolling 
                  in our advanced math course to strengthen your calculator section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results; 