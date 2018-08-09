import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Avatar } from 'antd';

import AvatarOptions from './avatar-options-modal.jsx';

const SERVER = 'http://138.68.234.86:8888';

const UserAvatar = (props) => {
  console.log('avatar props', props);
  let name;
  if (props.name) {
    name = props.name;
  } else if (props.searchName) {
    name = props.searchName;
  } else {
    name = props.user && props.user.local.name;
  }
  
  let src = null;
  if (props.src) {
    src = props.src;
    console.log('PROPS.SRC', src);
  } else if (props.user && props.user.local.avatar && props.localSource) {
    src = `${SERVER}/image/${props.user.local.avatar}`;
  } else if (props.searchUser && props.searchUser.local.avatar && !props.localSource) {
    src = `${SERVER}/image/${props.searchUser.local.avatar}`;
  }
  console.log('END SRC', src);

  let avatar;
  if (src) {
    avatar = <Avatar src={src} size={64} />;
  } else {
    avatar = <Avatar size={64} icon={'user'} />;
  }

  return (
    props.nogrid ? (
      <span className='regular-avatar'>
        {avatar}
        <span className='avatar-name'>
          {name}
        </span>
      </span>
    ) : (
      <Row className='row-avatar' gutter={24}>
        <Col className='col-avatar' span={8}>
          {avatar}
        </Col>
        <Col span={16}>
          <Row className='row-name' gutter={16}>
            {name}
          </Row>
          {props.canChange &&
          <Row className='row-avatar-options' gutter={16}>
            <AvatarOptions />
          </Row>}
        </Col>
      </Row>
    )
  )
};

const mapStateToProps = ({ user, search }) => {
  return {
    user: user.data,
    searchUser: search.user,
    searchName: search.user && search.user.local.name
  }
}

export default connect(mapStateToProps)(UserAvatar);
