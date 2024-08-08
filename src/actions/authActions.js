import axios from 'axios';

// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_SIGNUP_STATE = 'SET_SIGNUP_STATE';
export const SET_LOGIN_STATE = 'SET_LOGIN_STATE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_SESSION_ACTIVE = 'SET_SESSION_ACTIVE';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';

// Action Creators
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post('https://aigeine-api.onrender.com/login', {
      username,
      password,
    }, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const { user } = response.data;
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: 'Login failed' });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: 'Login failed' });
  }
};

export const setSignupState = (state) => ({
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

export const setSessionActive = (isActive) => ({
  type: SET_SESSION_ACTIVE,
  payload: isActive,
});

export const setUserImage = (image) => ({
  type: SET_USER_IMAGE,
  payload: image,
});
