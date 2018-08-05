'use strict'
import { combineReducers } from 'redux';

import photosReducer from './photosReducer';
import userReducer from './userReduces';

let reducer = combineReducers({
  photos: photosReducer,
  user: userReducer
});

export default reducer;
