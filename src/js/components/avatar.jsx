import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Avatar } from 'antd';

const UserAvatar = (props) => {
  let name;

  if (props.name) {
    name = props.name;
  } else if (props.searchName) {
    name = props.searchName;
  } else {
    name = props.user && props.user.local.name;
  }

  return (
    props.nogrid ? (
      <span className='regular-avatar'>
        <Avatar size={64} icon='user'/>
        <span className='avatar-name'>
          {name}
        </span>
      </span>
    ) : (
      <Row className='row-avatar' gutter={24}>
        <Col className='col-avatar' span={8}>
          <Avatar size={64} icon='user' />
        </Col>
        <Col span={16}>
          {name}
        </Col>
      </Row>
    )
  )
};

const mapStateToProps = ({ user, search }) => {
  return {
    user: user.data,
    searchName: search.user && search.user.local.name
  }
}

export default connect(mapStateToProps)(UserAvatar);
