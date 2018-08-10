'use strict'
import { combineReducers } from 'redux';

import userReducer from './userReducer';
import searchReducer from './searchReducer';
import avatarReducer from './avatarReducer';
import strangerReducer from './strangerReducer';
import uiReducer from './uiReducer';

let reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  avatar: avatarReducer,
  stranger: strangerReducer,
  ui: uiReducer
});

export default reducer;
