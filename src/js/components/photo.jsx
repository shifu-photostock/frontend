import React, { Component } from 'react';

const Photo = (props) => (
  <img onLoad={props.loadHandler} src={props.src} />
);

export default Photo;
