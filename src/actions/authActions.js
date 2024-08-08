// actions/authActions.js
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
