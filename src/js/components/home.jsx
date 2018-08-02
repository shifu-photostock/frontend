'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component { 
  render() {
    return (
      <div>Hello, world</div>
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
