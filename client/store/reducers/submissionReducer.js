import * as types from '../actionTypes';

const initialState = {
  submissions: [],
  submissionLoaded: 0,
};

const submissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUBMISSION:
      return { submissions: action.payload, submissionLoaded: 1 };
    default: return state;
  }
};
export default submissionReducer;
