'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';

import { fetchPhotos, incPage, decPage } from '../actions/photosActions';
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

  componentDidUpdate(prevProps) {
    let { page } = this.props;

    if (page != prevProps.page) {
      this.props.fetchPhotos();
    }
  }

  incSlide(cb) {
    this.props.incPage();
  }

  decSlide(cb) {
    this.props.decPage();
  }

  render() {
    let { photos, page } = this.props;
    const btnStyle = {
      border: '0px',
      background: 'rgba(0, 0, 0, 0.4)',
      color: 'white',
      padding: '10px',
      outline: '0px',
      opacity: '1',
      cursor: 'pointer',
    };

    console.log('slide should be', page * 5);
    const settings = {
      afterSlide: slide => {
        console.log('but current slide', slide);
      },
      slideIndex: page * 5,
      slidesToShow: 5,
      slidesToScroll: 5,
      cellSpacing: 20,
      renderCenterRightControls: ({ nextSlide, prevSlide, goToSlide }) => {
        this.goToSlide = goToSlide;
        return (
          <button 
            style={btnStyle}
            onClick={() => this.incSlide()}>
            Next
          </button>
        );
      },
      renderCenterLeftControls: () => (
        <button 
          style={btnStyle}
          onClick={() => this.decSlide()}>
          Prev 
        </button>
      ),
    };

    return (
      <div className='carousel'>
        <Carousel {...settings} ref={c => this.carousel = c}>
        {
          photos.map((src) => {
            if (src === '#') {
            //  return <div key={Math.random()}></div>;
            }
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
    photos: photos.list,
    page: photos.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhotos: (page) => {
      dispatch(fetchPhotos(page));
    },
    incPage: () => {
      dispatch(incPage());
    },
    decPage: () => {
      dispatch(decPage());
    }
  }
}
