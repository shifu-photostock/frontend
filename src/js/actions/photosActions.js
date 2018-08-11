import axios from '../containers/axiosApi';
import { checkLogged } from './userActions.js';

export function incUserPage() {
  return {
    type: 'INC_USER_PAGE'
  }
}

export function incStrangerPage() {
  return {
    type: 'INC_STRANGER_PAGE'
  }
}

export function endUserPhotos() {
  return {
    type: 'USER_PHOTOS_END'
  }
}

export function endStrangerPhotos() {
  return {
    type: 'STRANGER_PHOTOS_END'
  }
}

export function decUserPage() {
  return {
    type: 'DEC_USER_PAGE'
  }
}

export function decStrangerPage() {
  return {
    type: 'DEC_STRANGER_PAGE'
  }
}


export function fetchUserPhotosSuccess(photos, page) {
  return {
    type: 'FETCH_USER_PHOTOS_SUCCESS',
    payload: { list: photos, page } 
  }
}

export function fetchStrangerPhotosSuccess(photos, page, custom) {
  return {
    type: 'FETCH_STRANGER_PHOTOS_SUCCESS',
    payload: { list: photos, page } 
  }
}

export function photoDeleted(filename) {
  return {
    type: 'DELETE_PHOTO',
    payload: filename 
  }
}

export function deletePhoto(filename) {
  return (dispatch, getState) => {
    let { photos } = getState();
    axios.delete(`/images/${filename}`)
    .then((res) => {
      console.log(res);
      dispatch(photoDeleted(filename));
      dispatch(fetchPhotos(photos.page + 1));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function userPhotoLiked(filename) {
  return {
    type: 'USER_PHOTO_LIKED',
    filename
  }
}

export function strangerPhotoLiked(filename) {
  return {
    type: 'STRANGER_PHOTO_LIKED',
    filename
  }
}

export function likePhoto(filename) {
  return (dispatch, getState) => {
    /*axios.post('')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })*/
  }
}

export function unlikePhoto(filename) {
  return (dispatch, getState) => {
    /*axios.post('')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })*/
  }
}


export function deleteAll() {
  return (dispatch) => {
    axios.get('/getallimages')
    .then((res) => {
      return res.data.files;
    })
    .then((photos) => {
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

export function fetchPhotos(page) {
  return (dispatch, getState) => {
    let { photos, user, stranger, router } = getState();

    let isStranger = router.location.pathname.includes('/users/');
    let uid = isStranger ? stranger.id : user.id;
    let photosEnd = isStranger ? stranger.photosEnd : user.end;
    
    if (photosEnd) {
      return;
    }

    let path = `/profile/${uid}/carousel/${page}`;

    axios.get(path)
    .then((res) => {
      console.log(res);
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => ({
        src: `http://138.68.234.86:8888/image/${photo.filename}`,
        id: photo._id,
        filename: photo.filename
      }));
    })
    .then((urls) => {
      if (isStranger) {
        dispatch(fetchStrangerPhotosSuccess(urls, page));
      } else {
        dispatch(fetchUserPhotosSuccess(urls, page));
      }
    })
    .catch((err) => {
      console.log(err);
      if (isStranger) {
        dispatch(endStrangerPhotos());
      } else {
        dispatch(endUserPhotos());
      }
    })
  }
}
