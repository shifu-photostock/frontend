'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { clearPhotos, fetchPhotos, incPage } from '../actions/photosActions';
import Photo from './photo.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class PhotoCards extends Component {
  constructor() {
    super();

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.clearPhotos();
    this.props.fetchPhotos(0);
    this.props.fetchPhotos(1);
  }
  
  componentDidUpdate(prevProps) {

    if (this.props.location !== prevProps.location) {
      this.props.clearPhotos();
      this.props.fetchPhotos(0);
      this.props.fetchPhotos(1);
      return;
    }

    if (this.props.page !== prevProps.page) {
      //this.props.fetchPhotos();
      this.props.fetchPhotos(this.props.page + 1);
    }
  }

  loadMore() {
    this.props.incPage();
  }

  render() {
    let { photos, page, end } = this.props;

    return (
      <div className='photo-cards'>
        {
          photos.map((photo) => {
            if (photo) {
              return <Photo key={photo.src} {...photo} />
            } else {
              return <div key={Math.random()}></div>
            }
          })
        }
        <br/>
        <Button disabled={end} onClick={this.loadMore}>
          Load more
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ photos, user, stranger, router }) {
  let isStranger = router.location.pathname.includes('/users/') && stranger;

  return {
    page: photos.page,
    photos: photos.list,
    end: photos.end,
    location: router.location.pathname,
    isStranger
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
    clearPhotos: () => {
      dispatch(clearPhotos());
    }
  }
}
