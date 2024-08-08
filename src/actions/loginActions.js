export const SET_SIGNUP_STATE = 'SET_SIGNUP_STATE';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_SESSION_ACTIVE = 'SET_SESSION_ACTIVE';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';

export const setSignUpState = (state) => ({
  type: SET_SIGNUP_STATE,
  payload: state,
});

export const setLoginState = (state) => ({
  type: SET_LOGIN_STATE,
  payload: state,
});

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const setSessionActive = (active) => ({
  type: SET_SESSION_ACTIVE,
  payload: active,
});

export const setUserImage = (image) => ({
  type: SET_USER_IMAGE,
  payload: image,
});
