import axios from '../containers/axiosApi';

import { getRandomInt } from '../containers/assets';

export function searchSuccess(results) {
  return {
    type: 'SEARCH_SUCCESS',
    payload: results
  }
}

export function getUserByName(name) {
  return (dispatch) => {
    axios.post('/findbyname', {name})
    .then((res) => {
      console.log(res);
      dispatch(setFoundUser(res.data));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function setFoundUser(user) {
  return {
    type: 'SET_FOUND_USER',
    payload: user
  }
}


function searchResult(query) {
  let num = getRandomInt(1);

  switch(num) {
    case 0: 
      return ['test', 'testme', 'lalal']
    case 1: 
      return ['asdfasdf', 'asdfqwef', 'jfqwe']
  }
}

let searchCache = {};

export function search(query) {
  return (dispatch) => {
    console.log('query', query);
    console.log('cache', searchCache);

    if (!query) {
      return setTimeout(() => {
        dispatch(searchSuccess([]));
      }, 100);
    }

    if (searchCache[query]) {
      return dispatch(searchSuccess(searchCache[query]));
    }

    axios.post('/findbychar', {
      chars: query
    })
    .then((res) => {
      console.log(res);
      return res.data.map((user) => {
        return {
          name: user.local.name,
          id: user._id
        }
      });
    })
    .then((users) => {
      console.log(users);
      searchCache[query] = users;
      dispatch(searchSuccess(users));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
