'use strict'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

import Home from './components/home.jsx';
import Navbar from './components/navbar.jsx';
import LoginForm from './components/login-form.jsx';
import RegisterForm from './components/register-form.jsx';
import Uploader from './components/uploader.jsx';
import Carousel from './components/carousel.jsx';
import PhotoCards from './components/photo-cards.jsx';
import Logout from './components/logout.jsx';
import ProfileEdit from './components/profile-edit.jsx';
import UserPage from './components/user-page.jsx';
import { checkLogged } from './actions/userActions';


@connect(mapStateToProps, mapDispatchToProps)
export default class Router extends Component {
  componentDidMount() {
    this.props.checkLogged();
  }

  render() {
    let { logged, data } = this.props;

    if (data === 'loading') {
      return (
        <Spin size='large' className='initial-load-spin'/>
      )
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/users/:name' component={UserPage} />
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/profile-edit' render={(props) => (
              logged ? <ProfileEdit {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/profile' render={(props) => (
              logged ? <UserPage {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/upload' render={(props) => (
              logged ? <Uploader {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/gallery/carousel' render={(props) => (
              logged ? <Carousel {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/gallery/cards' render={(props) => (
              logged ? <PhotoCards {...props} /> :
                <Redirect to='/' />
            )} />
          </Switch>
        </Fragment>
      </BrowserRouter> 
    )
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.data,
    data: user.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkLogged: () => {
      dispatch(checkLogged());
    }
  }
}
