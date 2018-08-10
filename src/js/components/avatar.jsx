import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Avatar } from 'antd';

import AvatarOptions from './avatar-options-modal.jsx';
import PhotoModal from './photo-modal.jsx';
import { showPhotoModal } from '../actions/uiActions';

const SERVER = 'http://138.68.234.86:8888';

@connect(mapStateToProps, mapDispatchToProps)
export default class UserAvatar extends Component {

  constructor() {
    super();

    this.getName = this.getName.bind(this);
    this.getSrc = this.getSrc.bind(this);
  }

  getName() {
    let { name, stranger, isStranger, user } = this.props;
    if (name) {
      return name;
    } else if (isStranger) {
      return stranger.name;
    } else if (user){
      return user.name;
    }
  }

  getSrc() {
    let { src, user, isStranger, stranger } = this.props;

    if (src !== undefined) {
      return src;
    } else if (user.avatar && !isStranger) {
      return `${SERVER}/image/${user.avatar}`;
    } else if (stranger.avatar) {
      return `${SERVER}/image/${stranger.avatar}`;
    }
    return null;
  }


  render() {
    let avatar = null, src = this.getSrc();

    if (src) {
      avatar = (<span className='avatar-click' onClick={() => this.props.showPhoto(src)}>
                 <Avatar src={src} size={64} />
               </span>);
    } else {
      avatar = <Avatar size={64} icon='user' />;
    }

    return (
      <Fragment>
        {this.props.nogrid &&
          <span className='regular-avatar'>
            {avatar}
            <span className='avatar-name'>
              {this.getName()}
            </span>
          </span>}
        {!this.props.nogrid &&
          <Row className='row-avatar' gutter={24}>
            <Col className='col-avatar' span={8}>
              {avatar}
            </Col>
            <Col span={16}>
              <Row className='row-name' gutter={16}>
                {this.getName()}
              </Row>
              {this.props.canChange &&
              <Row className='row-avatar-options' gutter={16}>
                <AvatarOptions />
              </Row>}
            </Col>
          </Row>}
      </Fragment>
    )

  }
};

function mapStateToProps({ user, stranger, router }) {
  return {
    user,
    stranger,
    isStranger: router.location.pathname.includes('/users/') && stranger
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPhoto: (src) => {
      dispatch(showPhotoModal(src));
    }
  }
}
