import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Icon } from 'antd'

import { hideLikesDrawer } from '../actions/uiActions';

const LikesDrawer = ({ visible, likes, hideDrawer }) => (
  <Drawer 
    title='Likes'
    placement='left'
    closable={false}
    className='likes-drawer'
    onClose={hideDrawer}
    visible={visible}
  >
  {
    likes.map((like) => {
      return <div key={Math.random()}>{like.authorId}</div>;
    })
  }
  </Drawer>
);

const mapStateToProps = ({ ui }) => {
  return {
    visible: ui.showLikesDrawer,
    likes: ui.photoLikes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideDrawer: () => {
      dispatch(hideLikesDrawer());
    }
  }
}

//TODO add hashtags on uploading
export default connect(mapStateToProps, mapDispatchToProps)(LikesDrawer);
