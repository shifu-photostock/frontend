'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { fetchPhotos, incPage, decPage } from '../actions/photosActions';
import Photo from './photo.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class PhotoCards extends Component {
  constructor() {
    super();

    this.handleLoadImage = this.handleLoadImage.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchPhotos();
    this.props.fetchPhotos(this.props.page + 1);
  }
  
  handleLoadImage() {
  }

  componentDidUpdate(prevProps) {
    let { page } = this.props;

    if (page != prevProps.page) {
      //this.props.fetchPhotos();
      this.props.fetchPhotos(this.props.page + 1)
    }
  }

  loadMore() {
    this.props.incPage();
  }

  render() {
    let { photos, page } = this.props;

    console.log('slide should be', page * 5);
    return (
      <div className='photo-cards'>
        {
          photos.map((photo) => {
            if (photo) {
              return <Photo key={photo.src} {...photo} loadHandler={this.handleLoadImage} />
            } else {
              return <div key={Math.random()}></div>
            }
          })
        }
        <br/>
        <Button onClick={this.loadMore}>Load more</Button>
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
