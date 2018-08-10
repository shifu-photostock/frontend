import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, Tabs, Avatar } from 'antd';

const TabPane = Tabs.TabPane;
import EditProfile from './profile-tabs/edit-profile.jsx';
import EditPassword from './profile-tabs/edit-password.jsx';

export default class Profile extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='profile-edit-wrapper'>
        <Tabs
          defaultActiveKey='1'
          tabPosition='left'
          style={{ height: 300 }}
        >
          <TabPane tab='Edit profile' key='1'>
            <EditProfile />
          </TabPane>
          <TabPane tab='Change password' key='2'>
            <EditPassword />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

//TODO: add captcha
//TODO: add nick validation 
