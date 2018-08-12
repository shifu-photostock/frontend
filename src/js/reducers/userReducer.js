'use strict'
let initialState = {
  status: 'loading',
  page: 0,
  end: false,
  photos: [] 
};

const userReducer = (state=initialState, action) => {
  let photos = state.photos.concat();
  switch(action.type) {
  case 'USER_LOGGED': 
    console.log('user logged');
    state = {...state, ...action.payload, status: 'loaded'};
    break;
  case 'USER_NOT_LOGGED':
  case 'USER_LOGGED_OUT':
    state = {...initialState, status: 'loaded'};
    break;
  case 'AVATAR_DELETED':
    let newLocal = {...state.data.local, avatar: null};
    let newData = {...state.data, local: newLocal};
    state = {...state, data: newData}
    break;
  }
  return state;
};

export default userReducer;
