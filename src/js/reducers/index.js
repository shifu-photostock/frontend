'use strict'
import { combineReducers } from 'redux';

import Reducer from './Reducer';

let reducer = combineReducers({
  initial: Reducer,
});

export default reducer;
