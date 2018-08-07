'use strict'
let initialState = {
  list: [],
  page: 0,
  slide: 0,
  end: false
};

const photosReducer = (state=initialState, action) => {
  let list = state.list.concat();
  switch(action.type) {
  case 'PHOTOS_END_REACHED':
    state = {...state, end: true};
    break;
  case 'INC_PAGE': {
    let { page } = state;

    if (page >= Math.ceil(list.length / 5 - 1)) {
      page = 0;
    } else {
      page++;
    }

    state = {...state, page};
    break;
  }

  case 'DEC_PAGE':
    let { page } = state;
    if (page === 0) {
      page = Math.floor(list.length / 5 - 1);
    } else {
      page -= 1;
    }
    state = {...state, page};
    break;
  case 'FETCH_PHOTOS_START':
    state = {...state, loading: true};
    break;
  case 'DELETE_PHOTO':
    list = list.filter((photo) => {
      if (!photo) return;
      let id = typeof photo === undefined ? null : photo.id;

      if (id === action.payload) {
        return false;
      }
      return true;
    });
    state = {...state, list};
    break;
  case 'FETCH_PHOTOS_SUCCESS': 
    let data = action.payload 
    for (let i = data.page * 5, counter = 0; counter < 5; i++, counter++) {
      list[i] = data.photos[counter]/* || {src: null}*/;
      console.log(i);
    }

    state = {...state, list};
    break;
  }
  return state;
};

export default photosReducer;
