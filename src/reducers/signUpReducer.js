// reducers/authReducer.js

import {
    SET_SIGNUP_STATE,
    SET_USER_INFO,
    SET_ERROR,
  } from '../actions/authActions';
  
  const initialState = {
    signUpState: false,
    username: '',
    password: '',
    email: '',
    error: '',
  };
  
  const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SIGNUP_STATE:
        return { ...state, signUpState: action.payload };
      case SET_USER_INFO:
        return { ...state, ...action.payload };
      case SET_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default signUpReducer;
  