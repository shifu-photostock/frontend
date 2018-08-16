import React, { Component } from 'react';
import { Modal, Button, List, message } from 'antd';
import { connect } from 'react-redux';

import AvatarUpload from './avatar-upload.jsx';
import { deleteAvatar, uploadStart } from '../actions/avatarActions.js';


@connect(null, mapDispatchToProps)
export default class AvatarOptionsModal extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteAvatar = this.deleteAvatar.bind(this);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }

  deleteAvatar() {
    this.props.deleteAvatar();
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <a onClick={this.showModal}>edit avatar</a>
        <Modal
          title='Change Avatar'
          className='avatar-options-modal'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <AvatarUpload onUpload={this.handleCancel}>
            <Button>upload</Button>
          </AvatarUpload>
          <Button className='delete' type='danger' onClick={this.deleteAvatar}>delete</Button>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAvatar: () => {
      dispatch(deleteAvatar());
    },
    uploadStart: () => {
      dispatch(uploadStart());
    }
  } 
}
