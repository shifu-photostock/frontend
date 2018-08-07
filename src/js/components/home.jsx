'use strict'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import Uploader from './uploader.jsx';
import PhotoCarousel from './carousel.jsx';
import UserPage from './user-page.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component { 
  render() {
    return (
      <Fragment>
        <div style={{margin: 'auto', fontSize: '54px'}}>Welcome!</div>
      </Fragment>
    );
  }
};

function mapStateToProps({ user }) {
  return {
    logged: !!user.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
