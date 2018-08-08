import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserInfo from './user-info.jsx';
import PhotoCards from './photo-cards.jsx';
import { getUserByName } from '../actions/searchActions';


@connect(mapStateToProps, mapDispatchToProps)
export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: !!props.match.params.name
    }
  }

  componentDidMount() {
    if (this.state.loading) {
      this.props.getUserByName(this.props.match.params.name);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.name && this.props.user && this.state.loading) {
      this.setState({loading: false});
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading</div>
    }

    let source = this.props.match.params.name ? 'search' : null;
    console.log('source', source);

    return (
      <React.Fragment>
        <UserInfo source={source}/>
        <PhotoCards name={this.props.match.params.name} source={source}/>
      </React.Fragment>
    )
  }
};

function mapStateToProps({ search }) {
  return {
    user: search.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserByName: (name) => {
      dispatch(getUserByName(name));
    }
  }
}
