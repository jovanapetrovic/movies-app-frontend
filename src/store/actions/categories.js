import { getAllCategories } from '../../util/APIUtil';
import { SET_CATEGORIES } from '../types';
import { notification } from 'antd';

export const getCategories = () => dispatch => {
  let promise = getAllCategories();
  if (!promise) return;

  promise
    .then(categories => {
      dispatch({
        type: SET_CATEGORIES,
        payload: categories
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to load categories, please try again'
      });
    });
};
