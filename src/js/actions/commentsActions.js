import axios from '../containers/axiosApi';
import { showMessage } from './uiActions';


export function fetchCommentsStart() {
  return {
    type: 'FETCH_COMMENTS_START'
  }
}

export function fetchCommentsSuccess(comments) {
  return {
    type: 'FETCH_COMMENTS_SUCCESS',
    comments,
  }
}

export function addCommentSuccess(comment) {
  return {
    type: 'ADD_COMMENT_SUCCESS',
    comment, 
  }
}

export function deleteCommentSuccess(commentId, filename) {
  return {
    type: 'DELETE_COMMENT_SUCCESS',
    commentId,
    filename
  }
}

export function editCommentSuccess(commentId, content) {
  return {
    type: 'EDIT_COMMENT_SUCCESS',
    commentId,
    content,
  }
}

export function fetchComments(filename) {
  return (dispatch) => {
    dispatch(fetchCommentsStart());
    axios.get(`/image/${filename}/comment`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .then((comments) => {
      dispatch(fetchCommentsSuccess(comments))
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export function addComment(comment, filename) {
  return (dispatch) => {
    axios.post(`/image/${filename}/comment`, {
      comment
    })
    .then((res) => {
      console.log(res);
      dispatch(addCommentSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('add comment error', 'error'));
    })
  }
}

export function deleteComment(id) {
  return (dispatch) => {
    axios.delete(`/comment/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(deleteCommentSuccess(id))
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('delete comment error', 'error'));
    })
  }
}

export function editComment(id, newcomment) {
  return (dispatch) => {
    axios.put(`/comment/${id}`, {
      newcomment
    })
    .then((res) => {
      console.log(res);
      dispatch(editCommentSuccess(id, newcomment))
    })
    .catch((err) => {
      console.log(err);
      dispatch(showMessage('delete comment error', 'error'));
    })
  }
}
