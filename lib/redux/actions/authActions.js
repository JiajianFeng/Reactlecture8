import { AUTHENTICATE, DEAUTHENTICATE } from '../types';
import restClient from '../../restClient';

// gets the token from the cookie and saves it in the store
const authenticate = payload => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, payload });
  };
};

// removing the token
const deauthenticate = () => {
  return async dispatch => {
    try {
      await restClient().put('logout');
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: DEAUTHENTICATE });
    window.location.reload();
  };
};

export default {
  authenticate,
  deauthenticate
};
