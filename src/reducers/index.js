// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import historyReducer from './historyReducer';
import loginReducer from './loginReducer';
import signUpReducer from './signUpReducer';
import searchReducer from './searchReducer';
import sessionQueryReducer from './sessionQueryReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  history:historyReducer,
  login:loginReducer,
  signUp:signUpReducer,
  search:searchReducer,
  sessionQueary:sessionQueryReducer,
});

export default rootReducer;
