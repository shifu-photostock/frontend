'use strict'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spin, Icon, Button, Divider, Input } from 'antd';

const Textarea = Input.TextArea;

import { getPhotoByName } from '../containers/assets';
import { fetchComments, addComment, editComment, deleteComment } from '../actions/commentsActions';
import Photo from './photo.jsx';
import Avatar from './avatar.jsx';
import Comment from './comment.jsx';


@connect(mapStateToProps, mapDispatchToProps)
export default class CommentsBar extends Component {
  constructor() {
    super();
    
    this.state = {
      comment: '',
      idEditing: false,
      editId: null
    };

    this.input = React.createRef();
    this.comments = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.addComment = this.addComment.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidMount() {
    if (this.props.photoName) {
      this.props.fetchComments(this.props.photoName);
    }
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.photoName !== prevProps.photoName && this.props.photoName) {
      this.props.fetchComments(this.props.photoName);
    }
   
    if (this.props.comments.length !== prevProps.comments.length) {
      this.setState({ comment: '' });
      this.scrollDown();
    }
  }

  scrollDown() {
    let commentsRef = this.comments.current;
    commentsRef.scrollTop = commentsRef.scrollHeight; 
  }

  startEdit(comment, id) {
    this.setState({ comment, isEditing: true, editId: id });
    this.input.current.focus();
  }

  updateComment() {
    let { editId, comment } = this.state;

    if (!comment) return;

    this.props.editComment(editId, comment);
    this.cancelEdit();
  }

  deleteComment(id) {
    this.props.deleteComment(id);
  }

  cancelEdit() {
    this.setState({ isEditing: false, comment: '', editId: null });
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }

  addComment(e) {
    let comment = this.state.comment;
    if (!comment) return;

    this.props.addComment(comment, this.props.photoName);
  }

  render() {
    let { loading, logged, comments, photos, page, end, user } = this.props;

    return (
      <div className='comments-bar'>
        <div className='comments-bar__header'>
          <Avatar nogrid={true} />
        </div>
        <Divider />
        <div className='comments-bar__body' ref={this.comments}>
        {loading ? 
          <Spin size='large' />
          :
          comments.map((comment) => (
              <Comment {...comment} onDelete={this.deleteComment} onEdit={this.startEdit} key={comment._id}/>
          ))
        }
        </div>
        <Divider />
        {logged &&
        <div className='comments-bar__footer-wrapper'>
        <div className='comments-bar__footer'>
          <Textarea 
            ref={this.input}
            onChange={this.handleChange}
            value={this.state.comment}
            onPressEnter={this.addComment}
            autosize={{minRows: 3, maxRows: 3}}/>
          <div className='buttons'>
          {!this.state.isEditing && 
            <span onClick={this.addComment} className='publish-btn'>
              Publish
            </span>}
          {this.state.isEditing &&
            <span onClick={this.updateComment} className='update-btn'>
              Save 
            </span>}
          {this.state.isEditing &&
            <span onClick={this.cancelEdit} className='cancel-btn'>
              Cancel 
            </span>}
          </div>
          </div>
        </div>}
      </div>
    );
  }
}

function mapStateToProps({ comments, ui, photos, user }) {
  return {
    comments: comments.list,
    photoName: ui.photoName,
    photos: photos.list,
    logged: !!user.id,
    loading: comments.loading,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (filename) => {
      dispatch(fetchComments(filename));
    },
    deleteComment: (id, filename) => {
      dispatch(deleteComment(id, filename))
    },
    addComment: (content, filename) => {
      dispatch(addComment(content, filename));
    },
    editComment: (id, newContent, filename) => {
      dispatch(editComment(id, newContent, filename));
    }
  }
}
