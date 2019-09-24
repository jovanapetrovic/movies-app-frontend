import { SET_CATEGORIES } from '../types';

export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
