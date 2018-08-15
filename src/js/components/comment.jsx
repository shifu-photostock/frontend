import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Avatar from './avatar.jsx';

@connect(mapStateToProps, mapDispatchToProps)
export default class Photo extends Component {
  constructor() {
    super();

    this.editComment = this.editComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  editComment() {
    this.props.onEdit(this.props.content, this.props._id);
  }

  deleteComment() {
    this.props.onDelete(this.props._id);
  }

  render() {
    let { authorId, user, src, name, content } = this.props;
    return (
      <div className='comment'>
        <Link className='comment__name' to={`/users/${name}`}>
          {name}
        </Link>
        <span className='comment__content'>
          {content}
        </span>
        {authorId === user.id && 
        <div className='comment__actions'>
          <Icon onClick={this.editComment} type="edit" />
          <Icon onClick={this.deleteComment} type="close-square-o" />
        </div>}
      </div>
    )
  }
};

function mapStateToProps({ user }) {
  return {
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}
