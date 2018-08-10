import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import UserInfo from './user-info.jsx';
import PhotoCards from './photo-cards.jsx';

import { getStranger } from '../actions/strangerActions';


@connect(mapStateToProps, mapDispatchToProps)
export default class UserPage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (this.props.isStranger) {
      this.props.getStranger(this.props.match.params.name);
    }
  }

  componentDidUpdate(prevProps) {
    let { stranger, route, getStranger, match } = this.props;

    if (!route.includes('/users')) return;

    if (route !== prevProps.route) {
      return getStranger(match.params.name);
    }
  }

  render() {
    if (this.props.isStranger && this.props.stranger.loading) {
      return <div>Loading</div>
    }

    return (
      <Fragment>
        <UserInfo/>
        <PhotoCards/>
      </Fragment>
    )
  }
};

function mapStateToProps({ search, router, stranger }) {
  return {
    stranger,
    isStranger: router.location.pathname.includes('/users/'),
    route: router.location.pathname,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getStranger: (name) => {
      dispatch(getStranger(name));
    }
  }
}
