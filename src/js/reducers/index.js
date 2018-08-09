'use strict'
import { combineReducers } from 'redux';

import photosReducer from './photosReducer';
import userReducer from './userReduces';
import searchReducer from './searchReducer';
import avatarReducer from './avatarReducer';

let reducer = combineReducers({
  photos: photosReducer,
  user: userReducer,
  search: searchReducer,
  avatar: avatarReducer
});

export default reducer;
