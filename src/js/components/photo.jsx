import React, { Component } from 'react';
import { Card, Icon } from 'antd'

const { Meta } = Card;

export default class Photo extends Component {
  constructor() {
    super();
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    switch(e.target.id) {
    case 'delete':
      console.log('delete');
      break;
    }
  }

  render() {
    return (
      <Card
        hoverable
        style={{width: 240}}
        cover={<img onLoad={this.props.loadHandler} src={this.props.src} />}
        actions={[<Icon type="close-circle-o" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
      >
      </Card>
    )
  }
};

//TODO add hashtags on uploading
