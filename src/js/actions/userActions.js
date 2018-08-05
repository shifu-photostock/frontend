'use strict'
import axios from 'axios';

export function userLogged() {
  return {
    type: 'USER_LOGGED'
  }
}

export function userLoggedOut() {
  return {
    type: 'USER_LOGGED_OUT'
  }
}

export function registerUser(user) {
  return (dispatch) => {
     
  }
}

export function loginUser(user) {
  console.log('login', user);
  return (dispatch) => {

  }
}
