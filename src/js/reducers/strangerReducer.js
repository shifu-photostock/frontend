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
  case 'STRANGER_PHOTO_LIKED':
    photos.forEach((photo) => {
      if (photo.filename === action.filename) {
        photo.liked = !photo.liked;  
      } 
    });
    state = {...state, photos}
    break;
  case 'STRANGER_PHOTOS_END':
    state = {...state, end: true};
    break;
  case 'STRANGER_LOADING_START':
    state = {...initialState, loading: true};
    break;
  case 'FETCH_STRANGER_PHOTOS_SUCCESS':
    let { list, page } = action.payload;

    for (let i = page * 5, counter = 0; counter < 5; i++, counter++) {
      photos[i] = list[counter];
    }
  
    state = {...state, photos};
    break;
  case 'INC_STRANGER_PAGE': {
    let { page } = state;

    if (page >= Math.ceil(photos.length / 5 - 1)) {
      page = 0;
    } else {
      page++;
    }

    state = {...state, page};
    break;
  }

  case 'DEC_STRANGER_PAGE': {
    let { page } = state;
    if (page === 0) {
      page = Math.floor(photos.length / 5 - 1);
    } else {
      page -= 1;
    }
    state = {...state, page};
    break;
    }
  }

  return state;
};

export default userReducer;
