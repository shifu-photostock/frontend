'use strict'
let initialState = {
  page: 0,
  end: false,
  list: [] 
};

const photosReducer = (state=initialState, action) => {
  let photos = state.list.concat();
  switch(action.type) {
  case 'PHOTO_LIKED':
    photos.forEach((photo) => {
      if (photo.filename === action.filename) {
        photo.liked = !photo.liked;  
      } 
    });
    state = {...state, list: photos};
    break;
  case 'CLEAR_PHOTOS':
    state = {...state, page: 0, end: false, list: []};
    break;
  case 'DELETE_PHOTO':
    photos = photos.filter((photo) => {
      if (!photo) return;
      let filename = typeof photo === undefined ? null : photo.filename;

      if (filename === action.payload) {
        return false;
      }
      return true;
    });
    state = {...state, list: photos};
    break;
  case 'INC_PAGE': {
    let { page } = state;
    console.log('START INC PAGE');

    if (page >= Math.ceil(photos.length / 5 - 1)) {
      page = 0;
    } else {
      page++;
    }

    state = {...state, page};
    break;
  }
  case 'DEC_PAGE': {
    let { page } = state;
    if (page === 0) {
      page = Math.floor(photos.length / 5 - 1);
    } else {
      page -= 1;
    }
    state = {...state, page};
    break;
  }
  case 'PHOTOS_END':
    state = {...state, end: true};
    break;
  case 'FETCH_PHOTOS_SUCCESS':
    let { list, page } = action.payload;

    for (let i = page * 5, counter = 0; counter < 5; i++, counter++) {
      photos[i] = list[counter];
    }
  
    state = {...state, list: photos};
    break;
  }
  return state;
};

export default photosReducer;
