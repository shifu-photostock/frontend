'use strict'
import axios from 'axios';

const SERVER = 'http://138.68.234.86:8888';

export function userLogged(user) {
  return {
    type: 'USER_LOGGED',
    payload: user
  }
}

export function userLoggedOut() {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export function checkLogged() {
  return (dispatch) => {
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
      data: null,
      url: `${SERVER}/`,
    };
    axios(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function registerUser(user) {
  return (dispatch) => {
    axios.post(`${SERVER}/register`, { 

      username: user.email,
      name: user.nickname,
      password: user.password
    })   
    .then((res) => {
      console.log(res);
      return res.data.user
    })
    .then((user) => {
      dispatch(userLogged(user));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function changePassword(passwords, cb) {
  return (dispatch) => {
    setTimeout(() => {
      cb('err');
    }, 1000);
    /*axios.post('')
    .then((res) => {
      console.log(res);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb('error');
    })*/
  }
}

export function changeUserInfo(info, cb) {
  return (dispatch) => {
    setTimeout(() => {
      cb('err');
     }, 1000);
    /*axios.post('')
    .then((res) => {
      console.log(res);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb('error');
    })*/
 
   }
}

export function loginUser(user) {
  return (dispatch) => {
    axios.post(`${SERVER}/login`, { 
      username: user.email,
      password: user.password
    })   
    .then((res) => {
      console.log(res);
      return res.data.user
    })
    .then((user) => {
      dispatch(userLogged(user));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(userLoggedOut());
    axios.post(`${SERVER}/logout`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
