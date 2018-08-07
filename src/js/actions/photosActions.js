import axios from 'axios';

const SERVER = 'http://138.68.234.86:8888';

export function fetchPhotosStart() {
  return {
    type: 'FETCH_PHOTOS_START'
  }
}

export function incPage() {
  return {
    type: 'INC_PAGE'
  }
}

export function endReached() {
  return {
    type: 'PHOTOS_END_REACHED'
  }
}

export function decPage() {
  return {
    type: 'DEC_PAGE'
  }
}

export function fetchPhotosSuccess(photos, page) {
  return {
    type: 'FETCH_PHOTOS_SUCCESS',
    payload: { photos, page } 
  }
}

export function photoDeleted(id) {
  return {
    type: 'DELETE_PHOTO',
    payload: id
  }
}


export function deletePhoto(id) {
  return (dispatch, getState) => {
    let { photos } = getState();
    axios.delete(`${SERVER}/files/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(photoDeleted(id));
      dispatch(fetchPhotos(photos.page + 1));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function photoDeleted(id) {
  return {
    type: 'DELETE_PHOTO',
    payload: id
  }
}


export function deletePhoto(id) {
  return (dispatch, getState) => {
    let { photos } = getState();
    axios.get(`${SERVER}/files/${id}`);
    axios.delete(`${SERVER}/files/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(photoDeleted(id));
      dispatch(fetchPhotos(Math.round(photos.list.length / 5 - 2)));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function deleteAll() {
  return (dispatch) => {
    axios.get(`${SERVER}/getallimages`)
    .then((res) => {
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => (
        photo._id
      ))
    }) 
    .then((ids) => {
      ids.forEach((id) => {
        axios.delete(`${SERVER}/files/${id}`)
        .catch((err) => {
          console.log(err);
        })
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

<<<<<<< HEAD
export function fetchPhotos(pageNum) {
  return (dispatch, getState) => {
    let { photos } = getState();
    let page = pageNum || photos.page;
    
    console.log('photos end', photos.end);
    if (photos.end) {
=======
import { checkLogged } from './userActions.js';

export function fetchPhotos(pageNum) {
//  return checkLogged();
  return (dispatch, getState) => {
    let { photos } = getState();
    let page = pageNum || photos.page;
    if (photos.loading || (page + 1) * 5 < photos.list.length ) {
      console.log('return');
>>>>>>> user_cabinet
      return;
    }

    let path = `${SERVER}/carousel/${page}`;

    axios.get(path)
    .then((res) => {
      console.log(res);
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => ({
        src: `${SERVER}/image/${photo.filename}`,
        id: photo._id
      }));
    })
    .then((urls) => {
      dispatch(fetchPhotosSuccess(urls, page));
    })
    .catch((err) => {
      console.log(err);
      dispatch(endReached());
    })
  }
}
