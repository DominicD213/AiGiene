
import {
    SET_SIGNUP_STATE,
    SET_LOGIN_STATE,
    SET_USER_INFO,
    SET_SESSION_ACTIVE,
    SET_USER_IMAGE,
  } from '../actions/authActions';
  
  const initialState = {
    signUpState: false,
    loginState: false,
    username: '',
    password: '',
    email: '',
    loginUsername: '',
    loginPassword: '',
    sessionActive: false,
    userImage: null,
    imagePreview: '../Assets/personPlaceHolder.png',
  };
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SIGNUP_STATE:
        return { ...state, signUpState: action.payload };
      case SET_LOGIN_STATE:
        return { ...state, loginState: action.payload };
      case SET_USER_INFO:
        return { ...state, ...action.payload };
      case SET_SESSION_ACTIVE:
        return { ...state, sessionActive: action.payload };
      case SET_USER_IMAGE:
        return { ...state, userImage: action.payload };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  