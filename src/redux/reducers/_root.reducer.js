import { combineReducers } from 'redux';
import errors from './errors.reducer';
import feedback from './feedback.reducer';
import recyclingFeedback from './recycling.feedback.reducer';
import userSearch from './user-search.reducer';
import user from './user.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userSearch, // contains recycler search results
  feedback, // contains recycler/company feedback results for display on admin page
  recyclingFeedback, // contains recycling feedback results for display on admin page
});

export default rootReducer;
