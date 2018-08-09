import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import Avatar from './avatar.jsx';
import AvatarUpload from './avatar-upload.jsx';
import { logoutUser } from '../actions/userActions';

@connect(null, mapDispatchToProps)
export default class UserInfo extends Component {
  constructor() {
    super();
  }

  render() {
    let { source } = this.props;
    return (
      <div className='user-info'>
        <Avatar localSource={!source} {...source} nogrid={true} />

        {!source && 
          <Link to='/profile-edit'>
            <Button className='edit-profile'>
              Edit profile
            </Button>
          </Link>}
        {!source && 
          <Button type='danger' onClick={this.props.logout} className='logout-profile'>
            Logout
          </Button>}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  }
}
