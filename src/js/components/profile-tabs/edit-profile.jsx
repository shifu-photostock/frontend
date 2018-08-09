import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message, Tabs, Avatar, Form, Input, Icon, Cascader, Button } from 'antd';

import { changeUserInfo } from '../../actions/userActions';
import { checkFieldsForEmpty } from '../../containers/assets';
import UserAvatar from '../avatar.jsx';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@connect(mapStateToProps, mapDispatchToProps)
class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      canSubmit: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    let data = form.getFieldsValue();

    console.log('Received values of form: ', data);
    this.props.changeUserInfo(data, this.handleAnswer);
  }

  onChange() {
    const { form } = this.props;
    this.props.form.validateFields((err, data) => {
      let canSubmit = checkFieldsForEmpty(data, 2);;
      console.log('data', data);
      console.log('can sub', canSubmit);

      if (err) {
        canSubmit = false;
      }

      this.setState({ canSubmit });
    })
  }

  handleAnswer(err) {
    const { form } = this.props;
    if (err) {
      form.resetFields();
      return message.error('save failed!');
    } 
    message.success('successful save!');
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { local } = this.props.user;


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
        <UserAvatar localSource={true} canChange={true} name={this.props.form.getFieldValue('nickname')}  /> 
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              message: 'Please input your E-mail!',
            }],
            initialValue: local.email,
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Nickname
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{
              whitespace: true 
            }],
            initialValue: local.name,
          })(
            <Input onChange={this.handleNickChange} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={!this.state.canSubmit} type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.data,
    user: user.data
  }
}

function mapDispatchToProps(dispatch) { 
  return {
    changeUserInfo: (user, cb) => {
      dispatch(changeUserInfo(user, cb));
    }
  }
}

//TODO: add captcha
//TODO: add nick validation 

export default Form.create()(RegistrationForm);
