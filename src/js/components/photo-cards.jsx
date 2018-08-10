'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { fetchPhotos, incUserPage, incStrangerPage } from '../actions/photosActions';
import Photo from './photo.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class PhotoCards extends Component {
  constructor() {
    super();

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.fetchPhotos(0);
    this.props.fetchPhotos(1);
  }
  
  componentDidUpdate(prevProps) {

    if (JSON.stringify(prevProps.source) !== JSON.stringify(this.props.source)) {
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
    let { isStranger, incStrangerPage, incUserPage } = this.props;

    isStranger ? incStrangerPage() : incUserPage();
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

function mapStateToProps({ user, stranger, router }) {
  let isStranger = router.location.pathname.includes('/users/') && stranger;

  let source = isStranger ? stranger : user;
  return {
    page: source.page,
    photos: source.photos,
    end: source.end,
    isStranger
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhotos: (page) => {
      dispatch(fetchPhotos(page));
    },
    incStrangerPage: () => {
      dispatch(incStrangerPage());
    },
    incUserPage: () => {
      dispatch(incUserPage());
    },
  }
}
