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
      return res.data;
    })
    .then((id) => {
      if (id.length == 0) {
        return dispatch(userNotLogged());
      }
      dispatch(updateUser(id));
    })
    .catch((err) => {
      console.log(err);
      dispatch(userNotLogged());
    })
  }
}

export function updateUser(id) {
  return (dispatch, getState) => {
    let uid = id ? id : getState().user.data._id;  

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


export function changePassword(passwords, cb) {
  return (dispatch, getState) => {
    let id = getState().user.data._id;
    console.log('password', passwords);

    axios.post(`/profile/${id}/changepassword`, {
      oldpassword: passwords.oldPassword,
      newpassword: passwords.newPassword
    })
    .then((res) => {
      console.log(res);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb('error');
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
    let { local } = user.data;
    let id = user.data._id;

    let reqs = [];

    if (info.nickname != local.name) {
      reqs.push(changeUsername(id, info.nickname));
    }

    if (info.email != local.email) {
      reqs.push(changeMail(id, info.email));
    }

    Promise.all(reqs)
    .then((results) => {
      console.log(results);
      cb();
    })
    .catch((err) => {
      console.log(err);
      cb('error');
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
