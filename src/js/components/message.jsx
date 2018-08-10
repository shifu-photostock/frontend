import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd'

import { hideMessage } from '../actions/uiActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class Message extends Component {
  componentDidUpdate() {
    let { visible, title, status, hide } = this.props;

    if (visible) {
      message[status](title, hide);
    }
  }
  render() {
    return null;
  }
};

function mapStateToProps({ ui }) {
  return {
    visible: ui.showMessage,
    title: ui.messageTitle,
    status: ui.messageStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hide: () => {
      dispatch(hideMessage());
    }
  }
}

//TODO add hashtags on uploading
