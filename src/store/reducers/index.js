import { combineReducers } from 'redux';
import moviesReducer from './movies';
import categoriesReducer from './categories';
import authReducer from './auth';
import pollsReducer from './polls';

export default combineReducers({
  movies: moviesReducer,
  categories: categoriesReducer,
  auth: authReducer,
  polls: pollsReducer
});
