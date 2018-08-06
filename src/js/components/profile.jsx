import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Tabs, Avatar } from 'antd';

const TabPane = Tabs.TabPane;
import EditProfile from './profile-tabs/edit-profile.jsx';
import EditPassword from './profile-tabs/edit-password.jsx';

@connect(mapStateToProps, mapDispatchToProps)
export default class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    let { local } = this.props.user;
    return (
      <div>
        <Tabs
          defaultActiveKey='1'
          tabPosition='left'
          style={{ height: 300 }}
        >

          <TabPane tab="Edit profile" key="1">
            <EditProfile />
          </TabPane>
          <TabPane tab="Change password" key="2">
            <EditPassword />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.data,
    user: user.data
  }
}

function mapDispatchToProps(dispatch) { 
  return {
    registerUser: (user) => {
      dispatch(registerUser(user));
    }
  }
}

//TODO: add captcha
//TODO: add nick validation 
