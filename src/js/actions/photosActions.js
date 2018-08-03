import axios from 'axios';

export function fetchPhotosSuccess(photos) {
  return {
    type: 'FETCH_PHOTOS_SUCCESS',
    payload: photos
  }
}

export function fetchPhotos() {
  return (dispatch) => {
    axios.get('http://138.68.234.86:8888/getallimages')
    .then((res) => {
      console.log(res);
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => (
        'http://138.68.234.86:8888/image/' + photo.filename
      ));
    })
    .then((urls) => {
      dispatch(fetchPhotosSuccess(urls));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
