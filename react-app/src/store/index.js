import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookReducer from './books';
import genreReducer from './genres';
import reviewReducer from './reviews';
import session from './session'
import bookshelfReducer from './bookshelves';
import readStatusReducer from './readstatus';
import usersReducer from './users';

const rootReducer = combineReducers({
  session,
  books: bookReducer,
  genres: genreReducer,
  reviews: reviewReducer,
  bookshelves: bookshelfReducer,
  readStatus: readStatusReducer,
  users: usersReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
