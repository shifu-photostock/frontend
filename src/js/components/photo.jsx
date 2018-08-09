import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Modal } from 'antd'

import { deletePhoto } from '../actions/photosActions';
import PhotoModal from './photo-modal.jsx';

const { Meta } = Card;

@connect(null, mapDispatchToProps)
export default class Photo extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleClick(e) {
    console.log('DAS IS PROPS', this.props);
    switch(e.target.id) {
    case 'delete':
      console.log('delete', this.props.filename);
      this.props.delete(this.props.filename);
      break;
    }
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  handleOk() {
    this.setState({
      visible: false
    })
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

  render() {
    let deleteAction = this.props.source ? null : <Icon onClick={this.handleClick} id='delete' type="close-circle-o" />;
    return (
      <Fragment>
        <Card
          hoverable
          style={{width: 240}}
          cover={<img onClick={this.showModal} onLoad={this.props.loadHandler} src={this.props.src} />}
          actions={[deleteAction]}
        >
        </Card>
        <PhotoModal onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}>
          <img onLoad={this.props.loadHandler} src={this.props.src} />
        </PhotoModal>
      </Fragment>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return {
    delete: (id) => {
      dispatch(deletePhoto(id));
    }
  }
}

//TODO add hashtags on uploading
