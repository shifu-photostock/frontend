'use strict'
let initialState = {
  isUpdating: false
};

const avatarReducer = (state=initialState, action) => {
  switch(action.type) {
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
