'use strict'
let initialState = {};

const Reducer = (state=initialState, action) => {
  switch(action.type) {
  case '': 
    state = {...state};
    break;
  }
  return state;
};

export default Reducer;
