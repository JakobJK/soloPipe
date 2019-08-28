import * as types from './actionTypes';

export const setLogin = isLoggedIn => ({
  type: types.SET_LOGIN,
  payload: isLoggedIn,
});

export const setUsers = users => ({
  type: types.SET_USERS,
  payload: users,
});

export const setSubmission = submission => ({
  type: types.SET_SUBMISSION,
  payload: submission,
});
