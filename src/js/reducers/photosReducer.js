'use strict'
let initialState = {
  list: [],
  page: 0,
  slide: 0,
  loading: false
};

const photosReducer = (state=initialState, action) => {
  let list = state.list.concat();
  switch(action.type) {
  case 'INC_PAGE': {
    let { page } = state;

    if ((page + 2) * 5 <= list.length) {
      page++;
    } else {
      page = 0;
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
  case 'FETCH_PHOTOS_SUCCESS': 
    list = list.slice(0, list.length - 5);
    list = list.concat(action.payload);

    let num;
    if (action.payload.length === 5) {
      num = 5;
    } else {
      num = 5 - action.payload.length;
    }

    for (let i = 0; i < num; i++) {
      list.push(null);
    }

    state = {...state, loading: false, list};
    break;
  }
  return state;
};

export default photosReducer;
