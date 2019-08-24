import { GET_USER, CLEAR_USER } from '../types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
};
