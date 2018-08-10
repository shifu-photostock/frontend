import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Modal } from 'antd'

import { hidePhotoModal } from '../actions/uiActions';

const PhotoModal = ({ visible, src, hideModal }) => (
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
    <img src={src} />
  </Modal>
);

const mapStateToProps = ({ ui }) => {
  return {
    visible: ui.showPhotoModal,
    src: ui.photoSrc
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
