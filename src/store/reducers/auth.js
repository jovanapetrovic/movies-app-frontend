import {
  USER_LOADING_START,
  USER_LOADING_FINISH,
  SET_USER,
  LOGOUT
} from '../types';

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: false,
  isLoading: false
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOADING_START:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADING_FINISH:
      return {
        ...state,
        isLoading: false
      };
    case SET_USER:
      return {
        currentUser: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
