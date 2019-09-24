import { notification } from 'antd';
import {
  getWatchedMovies,
  createMovie,
  updateMovie,
  deleteMovie
} from '../../util/APIUtil';
import { SET_MOVIES, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE } from '../types';

export const getMovies = () => dispatch => {
  let promise = getWatchedMovies();
  if (!promise) return;

  promise
    .then(movies => {
      dispatch({
        type: SET_MOVIES,
        payload: movies
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to load movies, please try again!'
      });
    });
};

export const addMovie = movieData => dispatch => {
  let promise = createMovie(movieData);
  if (!promise) return;

  promise
    .then(movie => {
      movieData.id = movie.objectId;

      dispatch({
        type: ADD_MOVIE,
        payload: movieData
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to add the movie, please try again'
      });
    });
};

export const editMovie = movieData => dispatch => {
  let promise = updateMovie(movieData);
  if (!promise) return;

  promise
    .then(movie => {
      dispatch({
        type: EDIT_MOVIE,
        payload: movieData
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to edit the movie, please try again'
      });
    });
};

export const removeMovie = id => dispatch => {
  let promise = deleteMovie({ movieId: id });
  if (!promise) return;

  promise
    .then(response => {
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to delete the movie, please try again'
      });
    });
};
