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
    console.log(this.props.source);
    this.id = this.props.source && this.props.searchUser._id; 
    let page = this.props.source && this.props.searchUserPage;

    this.props.fetchPhotos(0, this.id); //can refactor first page
    this.props.fetchPhotos(page + 1, this.id);
  }
  
  handleLoadImage() {
  }

  componentDidUpdate(prevProps) {
    let page = this.props.source ? this.props.searchUserPage : this.props.page;
    let prevPage = this.props.source ? prevProps.searchUserPage : prevProps.page;

    if (page != prevPage) {
      //this.props.fetchPhotos();
      this.props.fetchPhotos(page + 1, this.id)
    }
  }

  loadMore() {
    console.log('load more id', this.id);
    this.props.incPage(!!this.id);
  }

  render() {
    let { searchUserPhotos, photos, page, source, photosEnd, searchPhotosEnd } = this.props;

    console.log('slide should be', page * 5);
    let photoSource = source === 'search' ? searchUserPhotos : photos;
    return (
      <div className='photo-cards'>
        {
          photoSource.map((photo) => {
            if (photo) {
              return <Photo key={photo.src} source={source} {...photo} loadHandler={this.handleLoadImage} />
            } else {
              return <div key={Math.random()}></div>
            }
          })
        }
        <br/>
        <Button disabled={source === 'search' ? searchPhotosEnd : photosEnd} onClick={this.loadMore}>Load more</Button>
      </div>
    );
  }
}

function mapStateToProps({ photos, search }) {
  return {
    photos: photos.list,
    page: photos.page,
    searchUserPhotos: search.photos,
    searchUser: search.user,
    searchUserPage: search.photoPage,
    photosEnd: photos.end,
    searchPhotosEnd: search.photosEnd
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhotos: (page, id) => {
      dispatch(fetchPhotos(page, id));
    },
    incPage: (custom) => {
      dispatch(incPage(custom));
    },
    decPage: () => {
      dispatch(decPage());
    }
  }
}
