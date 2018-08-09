'use strict'
let initialState = {
  src: null,
  isUpdating: false
};

const avatarReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'USER_LOGGED': 
    state = {...state, src: action.payload.local.avatar}
    break;
  case 'USER_LOGGED_OUT':
    state = {...state, src: null}
    break;
  case 'UPLOAD_START':
    state = {...state, isUpdating: true};
    break;
  case 'UPLOAD_END':
    state = {...state, isUpdating: false};
    break;
  }
  return state;
};

export default avatarReducer;
