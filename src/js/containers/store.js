'use strict'
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from '../reducers';

let env = process.env.NODE_ENV;

let enchancer;
let middleware = applyMiddleware(thunk);

if (env === 'development') {
  enchancer = composeWithDevTools(
    middleware,
  )
} else {
  enchancer = middleware;
}

export default createStore(
  reducer,
  enchancer 
);
