// actions/signUpActions.js
export const SET_SIGNUP_STATE = 'SET_SIGNUP_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ERROR = 'SET_ERROR';

export const setSignUpState = (state) => ({
  type: SET_SIGNUP_STATE,
  payload: state,
});

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
