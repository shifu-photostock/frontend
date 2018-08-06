import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd'

import { deletePhoto } from '../actions/photosActions';

const { Meta } = Card;

@connect(null, mapDispatchToProps)
export default class Photo extends Component {
  constructor() {
    super();
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    switch(e.target.id) {
    case 'delete':
      console.log('delete', this.props.id);
      this.props.delete(this.props.id);
      break;
    }
  }

  render() {
    return (
      <Card
        hoverable
        style={{width: 240}}
        cover={<img onLoad={this.props.loadHandler} src={this.props.src} />}
        actions={[<Icon onClick={this.handleClick} id='delete' type="close-circle-o" />,]}
      >
      </Card>
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
