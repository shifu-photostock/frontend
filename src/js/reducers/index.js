'use strict'
import { combineReducers } from 'redux';

import photosReducer from './photosReducer';

let reducer = combineReducers({
  photos: photosReducer,
});

export default reducer;
