import { SET_MOVIES, ADD_MOVIE, EDIT_MOVIE, DELETE_MOVIE } from '../types';

export default function moviesReducer(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.payload;
    case ADD_MOVIE:
      return [...state, action.payload];
    case EDIT_MOVIE:
      const newMovieData = action.payload;
      const oldMovieData = state.find(
        movie => movie.id === newMovieData.movieId
      );
      return [
        ...state.filter(movie => movie.id !== newMovieData.movieId),
        {
          id: newMovieData.movieId,
          ...oldMovieData,
          ...newMovieData
        }
      ];
    case DELETE_MOVIE:
      return state.filter(movie => movie.id !== action.payload);
    default:
      return state;
  }
}
