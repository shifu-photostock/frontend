import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';

import { loginUser } from '../actions/userActions';

const FormItem = Form.Item;

@connect(mapStateToProps, mapDispatchToProps)
class AuthForm extends Component {

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) {
        return console.log(err);
      }

      console.log('Received values of form: ', data);
      this.props.loginUser(data);
    });
  }

  render() {
    if (this.props.logged) {
      return <Redirect to='/' />
    }
    const { getFieldDecorator } = this.props.form;
    let { type } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <br />
          Or <Link to='/register'>register now!</Link>
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
    loginUser: (user) => {
      dispatch(loginUser(user));
    }
  }
}

export default Form.create()(AuthForm);
