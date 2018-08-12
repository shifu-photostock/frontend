'use strict'
let initialState = {
  photos: [],
  loading: true,
  end: false,
  page: 0
};

const userReducer = (state=initialState, action) => {
  let photos = state.photos.concat();
  switch(action.type) {
  case 'SET_STRANGER':
    state = {...initialState, ...action.payload, loading: false};   
    break;
  case 'STRANGER_LOADING_START':
    state = {...initialState, loading: true};
    break;
  }

  return state;
};

export default userReducer;
