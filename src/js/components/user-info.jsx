import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import Avatar from './avatar.jsx';
import AvatarUpload from './avatar-upload.jsx';
import { logoutUser } from '../actions/userActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class UserInfo extends Component {
  constructor() {
    super();
  }

  render() {
    let { isStranger } = this.props;
    return (
      <div className='user-info'>
        <Avatar nogrid={true} />

        {!isStranger && 
          <Link to='/profile-edit'>
            <Button className='edit-profile'>
              Edit profile
            </Button>
          </Link>}
        {!isStranger && 
          <Button type='danger' onClick={this.props.logout} className='logout-profile'>
            Logout
          </Button>}
      </div>
    )
  }
}

function mapStateToProps({ router }) {
  return {
    isStranger: router.location.pathname.includes('/users/')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  }
}
