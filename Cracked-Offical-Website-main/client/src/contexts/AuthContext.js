import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          const fullUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            ...userData
          };
          
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: fullUser
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            }
          });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      return userCredential.user;
    } catch (error) {
      const errorMessage = error.code === 'auth/user-not-found' ? 'User not found' :
                          error.code === 'auth/wrong-password' ? 'Wrong password' :
                          error.message;
      dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { email, password, firstName, lastName } = userData;
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      });
      
      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        role: 'student'
      });
      
      toast.success('Registration successful!');
      return userCredential.user;
    } catch (error) {
      const errorMessage = error.code === 'auth/email-already-in-use' ? 'Email already in use' :
                          error.message;
      dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const updateProfileData = async (userData) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user logged in');
      
      // Update display name in Firebase Auth
      if (userData.firstName && userData.lastName) {
        await updateProfile(user, {
          displayName: `${userData.firstName} ${userData.lastName}`
        });
      }
      
      // Update user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      // Update local state
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile: updateProfileData,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 