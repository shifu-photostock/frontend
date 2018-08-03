'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import Carousel from 'nuka-carousel';

import { fetchPhotos } from '../actions/photosActions';
import Photo from './photo.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class PhotoCarousel extends Component {
  constructor() {
    super();

    this.handleLoadImage = this.handleLoadImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchPhotos();
  }
  
  handleLoadImage() {
   this.carousel.setDimensions()
  }

  render() {
    let { photos } = this.props;
    const settings = {
      slidesToShow: 1,
    };

    return (
      <div className='carousel'>
        <Carousel {...settings} ref={c => this.carousel = c}>
        {
          photos.map((src) => {
            return <Photo key={src} src={src} loadHandler={this.handleLoadImage} />
          })
        }
        </Carousel>
      </div>
    );
  }
}

function mapStateToProps({ photos }) {
  return {
    photos: photos.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhotos: () => {
      dispatch(fetchPhotos());
    }
  }
}
