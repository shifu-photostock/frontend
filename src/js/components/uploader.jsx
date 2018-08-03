import React from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;


const Uploader = (props) => {
  return (
    <Dragger {...props} className='upload'>
      <p className='upload__icon'>
        <Icon type='inbox' />
      </p>
      <p className='upload__text'>
        Click or drag files to this area
      </p>
    </Dragger>
  )
}

const mapStateToProps = (state) => {
  return {
    name: 'file',
    multiple: true,
    action: 'http://138.68.234.86:8888/upload', 
    onChange: (info) => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed`);
      }
    }
  }
}

export default connect(mapStateToProps)(Uploader);
