'use strict'
let initialState = {
  results: [] 
};

const searchReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'SEARCH_SUCCESS': 
    state = {...state, results: action.payload}
    break;
  }
  return state;
};

export default searchReducer;
