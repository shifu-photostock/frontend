import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Avatar } from 'antd';

const UserAvatar = (props) => (
  props.nogrid ? (
    <span className='regular-avatar'>
      <Avatar size={64} icon='user'/>
      <span className='avatar-name'>
        {props.name ? props.name : props.user.local.name}
      </span>
    </span>
  ) : (
    <Row className='row-avatar' gutter={24}>
      <Col className='col-avatar' span={8}>
        <Avatar size={64} icon='user' />
      </Col>
      <Col span={16}>
        {props.name ? props.name : props.user.local.name}
      </Col>
    </Row>
  )
);

const mapStateToProps = ({ user }) => {
  return {
    user: user.data
  }
}

export default connect(mapStateToProps)(UserAvatar);
