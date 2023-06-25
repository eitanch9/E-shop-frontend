import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../Imports';

export const submitOrderReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, loading: false };
    case GET_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
