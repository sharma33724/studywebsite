import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../config/axios';
import toast from 'react-hot-toast';

const CourseContext = createContext();

const initialState = {
  courses: [],
  currentCourse: null,
  userProgress: {},
  practiceTests: [],
  loading: false,
  error: null
};

const courseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_COURSES':
      return {
        ...state,
        courses: action.payload,
        loading: false
      };
    case 'SET_CURRENT_COURSE':
      return {
        ...state,
        currentCourse: action.payload,
        loading: false
      };
    case 'SET_USER_PROGRESS':
      return {
        ...state,
        userProgress: action.payload,
        loading: false
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [action.payload.courseId]: action.payload.progress
        }
      };
    case 'SET_PRACTICE_TESTS':
      return {
        ...state,
        practiceTests: action.payload,
        loading: false
      };
    case 'ADD_TEST_RESULT':
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          testResults: [
            ...(state.userProgress.testResults || []),
            action.payload
          ]
        }
      };
    default:
      return state;
  }
};

export const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const fetchCourses = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await api.get('/api/courses');
      dispatch({ type: 'SET_COURSES', payload: res.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch courses';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  const fetchCourseById = async (courseId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await api.get(`/api/courses/${courseId}`);
      dispatch({ type: 'SET_CURRENT_COURSE', payload: res.data });
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch course';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
      return null;
    }
  };

  const fetchUserProgress = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await api.get('/api/progress');
      dispatch({ type: 'SET_USER_PROGRESS', payload: res.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch progress';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const updateProgress = async (courseId, lessonId, completed) => {
    try {
      const res = await api.post('/api/progress/update', {
        courseId,
        lessonId,
        completed
      });
      
      dispatch({
        type: 'UPDATE_PROGRESS',
        payload: {
          courseId,
          progress: res.data
        }
      });
      
      toast.success('Progress updated!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update progress';
      toast.error(message);
      return false;
    }
  };

  const fetchPracticeTests = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const res = await api.get('/api/practice-tests');
      dispatch({ type: 'SET_PRACTICE_TESTS', payload: res.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch practice tests';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  const submitTestResult = async (testId, answers, timeSpent) => {
    try {
      const res = await api.post('/api/practice-tests/submit', {
        testId,
        answers,
        timeSpent
      });
      
      dispatch({
        type: 'ADD_TEST_RESULT',
        payload: res.data
      });
      
      toast.success('Test submitted successfully!');
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit test';
      toast.error(message);
      return null;
    }
  };

  const getTestResult = async (testId) => {
    try {
      const res = await api.get(`/api/practice-tests/results/${testId}`);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch test result';
      toast.error(message);
      return null;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load initial data
  useEffect(() => {
    fetchCourses();
    fetchPracticeTests();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses: state.courses,
        currentCourse: state.currentCourse,
        userProgress: state.userProgress,
        practiceTests: state.practiceTests,
        loading: state.loading,
        error: state.error,
        fetchCourses,
        fetchCourseById,
        fetchUserProgress,
        updateProgress,
        fetchPracticeTests,
        submitTestResult,
        getTestResult,
        clearError
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}; 