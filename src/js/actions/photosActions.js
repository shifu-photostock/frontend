import axios from '../containers/axiosApi';
import { checkLogged } from './userActions.js';
import { showMessage } from './uiActions';
import { isLiked } from '../containers/assets';

export function incPage() {
  return {
    type: 'INC_PAGE'
  }
}

export function endPhotos() {
  return {
    type: 'PHOTOS_END'
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

export function photoLike(filename, uid) {
  return {
    type: 'PHOTO_LIKE',
    filename,
    uid
  }
}

export function likePhoto(filename) {
  return (dispatch, getState) => {
    let uid = getState().user.id;

    if (!uid) {
      return dispatch(showMessage('you must log in to like photos','error'));
    }

    dispatch(photoLike(filename, uid));

    axios.post(`/image/${filename}/like`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('network error', 'error'));
      dispatch(photoLike(filename, uid));
    })
  }
}

export function unlikePhoto(filename) {
  return (dispatch, getState) => {
    let uid = getState().user.id;

    dispatch(photoLike(filename, uid));

    axios.delete(`/image/${filename}/like`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('network error', 'error'));
      dispatch(photoLike(filename, uid));
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

export function clearPhotos() {
  return {
    type: 'CLEAR_PHOTOS'
  }
}

export function fetchPhotos(page, isEmpty) {
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
        filename: photo.filename,
        liked: isLiked(photo.likes, user.id),
        likes: photo.likes
      }));
    })
    .then((urls) => {
      dispatch(fetchPhotosSuccess(urls, page));
    })
    .catch((err) => {
      console.log(err);
      dispatch(endPhotos());
    })
  }
}
