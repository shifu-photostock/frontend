'use strict'
let initialState = {
  list: []
};

const photosReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'FETCH_PHOTOS_SUCCESS': 
    state = {...state, list: action.payload};
    break;
  }
  return state;
};

export default photosReducer;
