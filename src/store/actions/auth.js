import { getCurrentUser } from '../../util/APIUtil';
import {
  USER_LOADING_START,
  USER_LOADING_FINISH,
  SET_USER,
  LOGOUT
} from '../types';
import { ACCESS_TOKEN } from '../../constants';
import { notification } from 'antd';

export const loadCurrentUser = () => dispatch => {
  dispatch({ type: USER_LOADING_START });

  getCurrentUser()
    .then(user => {
      dispatch({
        type: SET_USER,
        payload: user
      });

      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch(error => {
      dispatch({ type: USER_LOADING_FINISH });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem('user');

  dispatch({ type: LOGOUT });

  notification.success({
    message: 'Movies App',
    description: 'You just logged out.'
  });
};
