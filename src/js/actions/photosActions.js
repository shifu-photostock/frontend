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

export function decPage() {
  return {
    type: 'DEC_PAGE'
  }
}

export function fetchPhotosSuccess(photos) {
  return {
    type: 'FETCH_PHOTOS_SUCCESS',
    payload: photos
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

export function fetchPhotos() {
  return (dispatch, getState) => {
    //return dispatch(deleteAll());
    let { photos } = getState();
    let page = photos.page;
    console.log('(page + 1) * 5 < photos.length', (page + 1) * 5 < photos.list.length);
    if (photos.loading || (page + 1) * 5 < photos.list.length ) {
      console.log('return');
      return;
    }
    dispatch(fetchPhotosStart());
    let path = `${SERVER}/carousel/${page}`;

    axios.get(path)
    .then((res) => {
      console.log(res);
      return res.data.files;
    })
    .then((photos) => {
      console.log(photos);
      return photos.map((photo) => (
        `${SERVER}/image/${photo.filename}`
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
