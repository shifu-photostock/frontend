'use strict'
let initialState = {
<<<<<<< HEAD
  data: null
=======
  data: { local: {email: 'test', name: 'test' }} 
>>>>>>> user_cabinet
};

const userReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'USER_LOGGED': 
    state = {...state, data: action.payload}
    break;
  case 'USER_LOGGED_OUT':
    state = {...state, data: null}
  }
  return state;
};

export default userReducer;
