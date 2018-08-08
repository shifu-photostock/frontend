'use strict'
let initialState = {
  results: [],
  user: null,
  photoPage: 0,
  photos: [],
  photosEnd: false
};

const searchReducer = (state=initialState, action) => {
  let photos = state.photos.concat();
  switch(action.type) {
  case 'PHOTOS_END_REACHED_S':
    state = {...state, photosEnd: true};
    break;
  case 'FETCH_PHOTOS_SUCCESS_S': 
    let data = action.payload 
    for (let i = data.page * 5, counter = 0; counter < 5; i++, counter++) {
      photos[i] = data.photos[counter]/* || {src: null}*/;
      console.log(i);
    }

    state = {...state, photos};
    break;
  case 'SEARCH_SUCCESS': 
    state = {...state, results: action.payload}
    break;
  case 'SET_FOUND_USER':
    state = {...state, user: action.payload, photosEnd: false, photos: [], photoPage: 0};
    break;
  case 'INC_PAGE_S': {
    let page = state.photoPage;

    if (page >= Math.ceil(photos.length / 5 - 1)) {
      page = 0;
    } else {
      page++;
    }

    state = {...state, photoPage: page};
    break;
  }

  case 'DEC_PAGE_S':
    let page = state.photoPage;

    if (page === 0) {
      page = Math.floor(photos.length / 5 - 1);
    } else {
      page -= 1;
    }

    state = {...state, photoPage: page};
    break;
  }
  return state;
};

export default searchReducer;
