import React, { Component } from 'react';
import { Card, Icon } from 'antd'

const { Meta } = Card;

const Photo = (props) => (
  <Card
    hoverable
    style={{width: 240}}
    cover={<img onLoad={props.loadHandler} src={props.src} />}
  >
    <Meta
      title=''
    />
  </Card>
);

//TODO add hashtags on uploading

export default Photo;
