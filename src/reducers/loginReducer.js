// Action Types
export const SET_SIGNUP_STATE = 'SET_SIGNUP_STATE';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_SESSION_ACTIVE = 'SET_SESSION_ACTIVE';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const SET_ERROR = 'SET_ERROR'; // Add this line

// Action Creators
export const setSignUpState = (signUpState) => ({
  type: SET_SIGNUP_STATE,
  payload: signUpState,
});

export const setLoginState = (loginState) => ({
  type: SET_LOGIN_STATE,
  payload: loginState,
});

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const setSessionActive = (sessionActive) => ({
  type: SET_SESSION_ACTIVE,
  payload: sessionActive,
});

export const setUserImage = (userImage) => ({
  type: SET_USER_IMAGE,
  payload: userImage,
});

export const setError = (error) => ({  // Add this action creator
  type: SET_ERROR,
  payload: error,
});
