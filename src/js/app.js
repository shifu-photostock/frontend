'use strict'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../css/style.css';
import '../css/reset.css';

import store from './containers/store';
import Home from './components/home.jsx';


render((
  <Provider store={store}>
    <Home />
  </Provider>
), document.getElementById('root'));
