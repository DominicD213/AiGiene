// reducers/signUpReducer.js
import { SET_SIGNUP_STATE, SET_ERROR, SET_LOADING } from '../actions/authActions';

const initialState = {
  signUpState: false,
  error: '',
  loading: false
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_STATE:
      return { ...state, signUpState: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default signUpReducer;
