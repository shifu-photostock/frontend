'use strict'
import { combineReducers } from 'redux';

import photosReducer from './photosReducer';
import userReducer from './userReduces';
import searchReducer from './searchReducer';

let reducer = combineReducers({
  photos: photosReducer,
  user: userReducer,
  search: searchReducer
});

export default reducer;
