import axios from '../containers/axiosApi';

import { getUser } from './userActions';

export function getStranger(name) {
  console.log('get stranger');
  return (dispatch) => {
    dispatch(startStrangerLoading());
    axios.post(`/findbyname`, {name})
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((stranger) => {
      let converted = {
        ...stranger.local,
        id: stranger._id,
      };
      dispatch(setStranger(converted));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function setStranger(stranger) {
  return {
    type: 'SET_STRANGER',
    payload: stranger
  } 
}

export function startStrangerLoading() {
  return {
    type: 'STRANGER_LOADING_START',
  }
}

export function strangerLoadingError() {
  return {
    type: 'STRANGER_LOADING_ERROR'
  }
}
