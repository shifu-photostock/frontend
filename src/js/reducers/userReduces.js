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
    break;
  case 'USER_LOGGED_OUT':
    state = {...state, data: null}
    break;
  case 'AVATAR_DELETED':
    let newLocal = {...state.data.local, avatar: null};
    let newData = {...state.data, local: newLocal};
    state = {...state, data: newData}
  }
  return state;
};

export default userReducer;
