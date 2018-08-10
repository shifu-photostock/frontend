'use strict'
let initialState = {
  showPhotoModal: false,
  photoSrc: null,
  showMessage: false,
  messageTitle: '',
  messageStatus: ''
};


const searchReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'SHOW_MESSAGE':
    state = {
      ...state,
      showMessage: true,
      messageTitle: action.title,
      messageStatus: action.status
    };
    break;
  case 'HIDE_MESSAGE':
    state = {
      ...state,
      showMessage: false,
      messageTitle: '',
      messageStatus: ''
  };
    break;
  case 'SHOW_PHOTO_MODAL':
    state = {...state, showPhotoModal: true, photoSrc: action.src};
    break;
  case 'HIDE_PHOTO_MODAL':
    state = {...state, showPhotoModal: false, photoSrc: null};
    break;
  }
  return state;
};

export default searchReducer;
