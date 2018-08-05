'use strict'
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home.jsx';
import Navbar from './components/navbar.jsx';
import LoginForm from './components/login-form.jsx';
import RegisterForm from './components/register-form.jsx';
import Uploader from './components/uploader.jsx';
import Carousel from './components/carousel.jsx';
import Logout from './components/logout.jsx';

@connect(mapStateToProps)
export default class Router extends Component {
  render() {
    let { logged } = this.props;
    return (
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/upload' render={(props) => (
              logged ? <Uploader {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/gallery/carousel' render={(props) => (
              logged ? <Carousel {...props} /> :
                <Redirect to='/' />
            )} />
            <Route path='/gallery/cards' render={(props) => (
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
    logged: !!user.data
  }
}
