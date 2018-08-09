import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Upload, Icon, message } from 'antd';

import { uploadStart, uploadEnd } from '../actions/avatarActions';
import { updateUser } from '../actions/userActions';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file, cb) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AvatarUpload extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      this.props.onUpload();
      this.props.uploadStart();
      return;
    }

    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      });
      this.props.uploadEnd();
      this.props.updateUser();
    }
  }

  render() {
    let { user } = this.props;
    return (
      <Upload
        name='file'
        className="avatar-uploader"
        showUploadList={false}
        action='http://138.68.234.86:8888/uploadavatar'
        data={{author: user._id}}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {this.props.children} 
      </Upload>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user: user.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uploadStart: () => {
      dispatch(uploadStart());
    },
    uploadEnd: () => {
      dispatch(uploadEnd());
    },
    updateUser: () => {
      dispatch(updateUser());
    }
  }
}
