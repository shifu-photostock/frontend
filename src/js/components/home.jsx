'use strict'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import Uploader from './uploader.jsx';
import PhotoCarousel from './carousel.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component { 
  render() {
    return (
      <Fragment>
        <Uploader />
        <PhotoCarousel />
      </Fragment>
    );
  }
};

function mapStateToProps({ theme }) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
