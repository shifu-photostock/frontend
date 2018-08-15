'use strict'
let initialState = {
  list: [],
  loading: true 
};

const commentsReducer = (state=initialState, action) => {
  let list = state.list.concat();
  switch(action.type) {
  case 'FETCH_COMMENTS_START':
    state = {...state, loading: true};
    break;
  case 'FETCH_COMMENTS_SUCCESS':
    state = {...state, list: action.comments, loading: false };
    break;
  case 'ADD_COMMENT_SUCCESS':
    list.push(action.comment);
    state = {...state, list};
    break;
  case 'EDIT_COMMENT_SUCCESS':
    list.forEach((comment, index) => {
      if (comment._id === action.commentId) {
        comment = {...comment};
        comment.content = action.content;
        list[index] = comment;
      }
    });

    state = {...state, list};
    break;
  case 'DELETE_COMMENT_SUCCESS':
    list.forEach((comment, index) => {
      if (comment._id === action.commentId) {
        list.splice(index, 1);
      }
    });
    state = {...state, list};
    break; 
   }
  return state;
};

export default commentsReducer;
