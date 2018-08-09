import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Avatar } from 'antd';

import AvatarOptions from './avatar-options-modal.jsx';
import PhotoModal from './photo-modal.jsx';

const SERVER = 'http://138.68.234.86:8888';

@connect(mapStateToProps)
export default class UserAvatar extends Component {

  constructor() {
    super();

    this.state = {
      visible: false
    }
    
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  showModal() {
    this.setState({
      visible: true
    })
  }

  handleOk() {
    this.setState({
      visible: false
    })
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

  render() {
    let props = this.props;
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
      avatar = (<span className='avatar-click' onClick={this.showModal}>
                 <Avatar src={src} size={64} />
               </span>);
    } else {
      avatar = <Avatar size={64} icon={'user'} />;
    }

    return (
      <Fragment>
        {props.nogrid &&
          <span className='regular-avatar'>
            {avatar}
            <span className='avatar-name'>
              {name}
            </span>
          </span>}
        {!props.nogrid &&
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
          </Row>}
         {src && 
           <PhotoModal onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}>
             <img src={src} />
           </PhotoModal>
         }
      </Fragment>
    )

  }
};

function mapStateToProps({ user, search }) {
  return {
    user: user.data,
    searchUser: search.user,
    searchName: search.user && search.user.local.name
  }
}

