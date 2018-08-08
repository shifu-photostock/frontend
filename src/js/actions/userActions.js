'use strict'
import axios from '../containers/axiosApi.js';


export function userLogged(user) {
  return {
    type: 'USER_LOGGED',
    payload: user
  }
}

export function userNotLogged() {
  return {
    type: 'USER_NOT_LOGGED'
  }
}

export function userLoggedOut() {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export function checkLogged() {
  return (dispatch) => {
    axios.get('/')
    .then((res) => {
      console.log(res);
      return res.data.passport;
    })
    .then((passport) => {
      if (passport === undefined) {
        return dispatch(userNotLogged());
      }

      dispatch(userLogged(passport.user));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userNotLogged());
    })
  }
}

export function registerUser(user) {
  return (dispatch) => {
    axios.post('/register', { 

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
    axios.post('/login', { 
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
    axios.post('/logout')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
