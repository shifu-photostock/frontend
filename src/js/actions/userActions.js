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
