import * as types from '../actionTypes';

const initialState = {
  username: 'Default User',
  companyid: 0,
  companyName: 'Default Company',
  isLoggedIn: 0,
  isAdmin: 0,
  permission: 'null',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOGIN:
      return { ...action.payload };
    default: return state;
  }
};
export default profileReducer;
