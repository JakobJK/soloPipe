import * as types from '../actionTypes';

const initialState = {
  users: [],
  usersLoaded: 0,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return { users: action.payload, usersLoaded: 1 };
    default: return state;
  }
};
export default usersReducer;
