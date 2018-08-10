'use strict'
import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import reducer from '../reducers';

let env = process.env.NODE_ENV;

export const history = createBrowserHistory();

let enchancer;
let middleware = applyMiddleware(routerMiddleware(history), thunk);

if (env === 'development') {
  enchancer = composeWithDevTools(

    middleware,
  )
} else {
  enchancer = middleware;
}

export default createStore(
  connectRouter(history)(reducer),
  enchancer
);
