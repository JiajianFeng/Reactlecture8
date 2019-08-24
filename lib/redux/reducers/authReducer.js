import { AUTHENTICATE, DEAUTHENTICATE } from '../types';

const initialState = {
  uid: null,
  authToken: null,
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...action.payload, isLoggedIn: true };
    case DEAUTHENTICATE:
      return { uid: null, authToken: null, isLoggedIn: false };
    default:
      return state;
  }
};
