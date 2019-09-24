import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  auth: {
    currentUser: user ? user : null,
    isAuthenticated: !!user,
    isLoading: false
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
