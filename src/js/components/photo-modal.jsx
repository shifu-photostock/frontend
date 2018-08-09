import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Modal } from 'antd'

const { Meta } = Card;

export default class PhotoModal extends Component {
  render() {
    return (
      <Modal 
        className='photo-modal'
        visible={this.props.visible}
        bodyStyle={{padding: '10px'}}
        footer={null}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        width='auto'
        centered={true}
      >
        {this.props.children}
      </Modal>
    )
  }
};

//TODO add hashtags on uploading
