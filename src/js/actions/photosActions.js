import axios from '../containers/axiosApi';
import { checkLogged } from './userActions.js';

export function fetchPhotosStart() {
  return {
    type: 'FETCH_PHOTOS_START'
  }
}

export function incPage(custom) {
  let type = 'INC_PAGE';
  if (custom) type += '_S';

  return {
    type
  }
}

export function endReached(custom) {
  let type = 'PHOTOS_END_REACHED';
  if (custom) type += '_S';

  return {
    type
  }
}

export function decPage(custom) {
  let type = 'DEC_PAGE';
  if (custom) type += '_S';
  return {
    type
  }
}

export function fetchPhotosSuccess(photos, page, custom) {
  let type = 'FETCH_PHOTOS_SUCCESS';
  if (custom) type += '_S';

  return {
    type,
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
    axios.delete(`/files/${id}`)
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

export function deleteAll() {
  return (dispatch) => {
    axios.get('/getallimages')
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

export function fetchPhotos(pageNum, customId) {
  console.log('custom id', customId);
  return (dispatch, getState) => {
    
    let { photos, user, search } = getState();
    let page;
    if (pageNum) {
      console.log('fetch photos 1');
      page = pageNum;
    } else if (customId) {
      page = search.photoPage;
      console.log('fetch photos 2');
    } else {
      page = photos.page;
      console.log('fetch photos 3');
    }

    console.log('fetch photos page', page);

    let id = customId || user.data._id;
    let photosEnd = customId ? search.photosEnd : photos.end;
    
    console.log('photos end', photosEnd);
    if (photosEnd) {
      return;
    }

    let path = `/profile/${id}/carousel/${page}`;

    axios.get(path)
    .then((res) => {
      console.log(res);
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => ({
        src: `http://138.68.234.86:8888/image/${photo.filename}`,
        id: photo._id
      }));
    })
    .then((urls) => {
      dispatch(fetchPhotosSuccess(urls, page, !!customId));
    })
    .catch((err) => {
      console.log(err);
      dispatch(endReached(!!customId));
    })
  }
}
