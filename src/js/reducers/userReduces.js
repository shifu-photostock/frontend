'use strict'
let initialState = {
  data: 'loading' 
};

const userReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'USER_LOGGED': 
    state = {...state, data: action.payload}
    break;
  case 'USER_NOT_LOGGED':
    state = {...state, data: null}
  case 'USER_LOGGED_OUT':
    state = {...state, data: null}
  }
  return state;
};

export default userReducer;
