import { GET_USER } from '../types';

const updateUser = payload => {
  return dispatch => {
    dispatch({ type: GET_USER, payload });
  };
};

export default {
  updateUser
};
