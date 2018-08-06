import axios from 'axios';

import { getRandomInt } from '../containers/assets';

export function searchSuccess(results) {
  return {
    type: 'SEARCH_SUCCESS',
    payload: results
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

export function search(query) {
  return (dispatch) => {
    if (!query) {
      return dispatch(searchSuccess([]));
    }

    dispatch(searchSuccess(searchResult(query)));

    /*axios.get('')
    .then((res) => {
      console.log(res);
      dispatch(searchSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    })*/
  }
}
