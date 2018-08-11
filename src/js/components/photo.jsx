import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Modal } from 'antd'

import { deletePhoto, likePhoto, unlikePhoto } from '../actions/photosActions';
import { showPhotoModal } from '../actions/uiActions';
import PhotoModal from './photo-modal.jsx';

const { Meta } = Card;

@connect(mapStateToProps, mapDispatchToProps)
export default class Photo extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.renderActions =  this.renderActions.bind(this);
    this.showPhoto = this.showPhoto.bind(this);
  }

  handleClick(e) {
    let { like, filename, unlike, liked } = this.props;
    switch(e.target.id) {
    case 'delete':
      this.props.delete(filename);
      break;
    case 'like':
      if (liked) {
        unlike(filename);
      } else {
        like(filename);
      }
      break;
    }
  }

  renderActions() {
    let actions = [];
    let { liked } = this.props;

    actions.push (
      <Icon className={'like-icon'+(liked ? '-active' : '')} onClick={this.handleClick} id='like' type='heart' />
    )

    if (!this.props.isStranger) {
      actions.push(
        <Icon onClick={this.handleClick} id='delete' type='close-circle-o' />
      );
    } 
    return actions;
  }

  showPhoto() {
    this.props.showPhoto(this.props.src);
  }

  render() {
    let { showPhoto, src, loadHandler } = this.props;
    return (
      <Fragment>
        <Card
          hoverable
          style={{width: 240}}
          cover={<img onClick={this.showPhoto} onLoad={loadHandler} src={src} />}
          actions={this.renderActions()}
        >
        </Card>
      </Fragment>
    )
  }
};

function mapStateToProps({ router }) {
  return {
    isStranger: router.location.pathname.includes('/users/')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delete: (name) => {
      dispatch(deletePhoto(name));
    },
    like: (name) => {
      dispatch(likePhoto(name));
    },
    unlike: (name) => {
      dispatch(unlikePhoto(name));
    },
    showPhoto: (src) => {
      dispatch(showPhotoModal(src));
    }
  }
}

//TODO add hashtags on uploading
