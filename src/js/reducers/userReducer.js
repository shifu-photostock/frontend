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
  case 'USER_PHOTO_LIKED':
    photos.forEach((photo) => {
      if (photo.filename === action.filename) {
        photo.liked = !photo.liked;  
      } 
    });
    state = {...state, photos};
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
    state = {...state, photos};
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
  case 'INC_USER_PAGE': {
    let { page } = state;

    if (page >= Math.ceil(photos.length / 5 - 1)) {
      page = 0;
    } else {
      page++;
    }

    state = {...state, page};
    break;
  }
  case 'DEC_USER_PAGE': {
    let { page } = state;
    if (page === 0) {
      page = Math.floor(photos.length / 5 - 1);
    } else {
      page -= 1;
    }
    state = {...state, page};
    break;
  }
  case 'USER_PHOTOS_END':
    state = {...state, end: true};
    break;
  case 'FETCH_USER_PHOTOS_SUCCESS':
    let { list, page } = action.payload;

    for (let i = page * 5, counter = 0; counter < 5; i++, counter++) {
      photos[i] = list[counter];
    }
  
    state = {...state, photos};
    break;
  }
  return state;
};

export default userReducer;
