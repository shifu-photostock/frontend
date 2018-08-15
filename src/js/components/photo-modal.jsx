import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Modal } from 'antd'

import { hidePhotoModal } from '../actions/uiActions';
import CommentsBar from './comments-bar.jsx';

const PhotoModal = ({ visible, photoName, hideModal }) => (
  <Modal 
    className='photo-modal'
    visible={visible}
    bodyStyle={{padding: '10px'}}
    footer={null}
    onOk={hideModal}
    onCancel={hideModal}
    width='auto'
    centered={true}
  >
    <img src={`http://138.68.234.86:8888/image/${photoName}`} />
    <CommentsBar />
  </Modal>
);

const mapStateToProps = ({ ui }) => {
  return {
    visible: ui.showPhotoModal,
    photoName: ui.photoName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideModal: () => {
      dispatch(hidePhotoModal());
    }
  }
}

//TODO add hashtags on uploading
export default connect(mapStateToProps, mapDispatchToProps)(PhotoModal);
