import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';

import { changePassword } from '../../actions/userActions';
import { checkFieldsForEmpty } from '../../containers/assets';

import UserAvatar from '../avatar.jsx';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(mapStateToProps, mapDispatchToProps)
class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      canSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this); 
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = this.props.form;
    let data = form.getFieldsValue();
    console.log('Received values of form: ', data);
    this.props.changePassword(data, this.handleAnswer);
  }

  onChange() {
    const { form } = this.props;
    this.props.form.validateFields((err, data) => {
      let canSubmit = checkFieldsForEmpty(data, 3);;

      if (err) {
        canSubmit = false;
      }

      this.setState({ canSubmit });
    })
  }


  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords doesnt match!');
    } else {
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onChange={this.onChange} onSubmit={this.handleSubmit}>
        <UserAvatar localSource={true}/>

        <FormItem
          {...formItemLayout}
          label="Old Password"
        >
          {getFieldDecorator('oldPassword', {
            rules: [{}],
          })(
            <Input type="password" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="New Password"
        >
          {getFieldDecorator('newPassword', {
            rules: [{
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm New"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={!this.state.canSubmit} type="primary" htmlType="submit">Change</Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.data
  }
}

function mapDispatchToProps(dispatch) { 
  return {
    changePassword: (passwords, cb) => {
      dispatch(changePassword(passwords, cb));
    }
  }
}

//TODO: add captcha
//TODO: add nick validation 

export default Form.create()(RegistrationForm);
