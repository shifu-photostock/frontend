'use strict'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../css/style.css';
import '../css/reset.css';
import 'antd/dist/antd.css';

import store from './containers/store';
import Router from './router';

render((
  <Provider store={store}>
    <Router />
  </Provider>
), document.getElementById('root'));
