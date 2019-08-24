import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import { DEAUTHENTICATE, DEFAULT } from '../types';

const appReducer = combineReducers({
  authentication: authReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  let currentState = state;
  const currentAction = action;
  if (action.type === DEAUTHENTICATE) {
    currentAction.type = DEFAULT;
    currentState = {};
  }
  return appReducer(currentState, action);
};

export default rootReducer;
