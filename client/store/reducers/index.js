import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import submissionReducer from './submissionReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
  profile: profileReducer,
  submission: submissionReducer,
  users: usersReducer,
});

export default reducers;
