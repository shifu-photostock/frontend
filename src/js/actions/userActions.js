'use strict'
import axios from '../containers/axiosApi.js';

import { showMessage } from './uiActions';

export function userLogged(user) {
  return {
    type: 'USER_LOGGED',
    payload: {
      ...user.local,
      id: user._id
    }
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
      return res.data;
    })
    .then((id) => {
      if (id.length == 0) {
        return dispatch(userNotLogged());
      }
      dispatch(getUser(id));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userNotLogged());
    })
  }
}

export function getUser(id) {
  return (dispatch, getState) => {
    let uid = id ? id : getState().user.id;  

    axios.get(`/profile/${uid}`)
      .then((res) => {
        console.log(res);
        return res.data[0];
      })
      .then((user) => {
        dispatch(userLogged(user));
      })
      .catch((err) => {
        console.log(err);
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


export function changePassword(passwords) {
  return (dispatch, getState) => {
    let id = getState().user.id;

    axios.post(`/profile/${id}/changepassword`, {
      oldpassword: passwords.oldPassword,
      newpassword: passwords.newPassword
    })
    .then((res) => {
      console.log(res);
      dispatch(showMessage('password update success!', 'success'));
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('password update failed!', 'error'));
    })
  }
}

export function changeUsername(id, newName) {
  return axios.post(`/profile/${id}/changename`, {newname: newName})
}

export function changeMail(id, newMail) {
  return axios.post(`/profile/${id}/changemail`, {newmail: newMail})
}

export function changeUserInfo(info, cb) {
  console.log(info);
  return (dispatch, getState) => {
    let { user } = getState();

    let id = user.id;

    let reqs = [];

    if (info.nickname != user.name) {
      reqs.push(changeUsername(id, info.nickname));
    }

    if (info.email != user.email) {
      reqs.push(changeMail(id, info.email));
    }

    Promise.all(reqs)
    .then((results) => {
      console.log(results);
      dispatch(getUser());
      dispatch(showMessage('successfull save!', 'success'));
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('save failed!', 'error'));
    })
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
