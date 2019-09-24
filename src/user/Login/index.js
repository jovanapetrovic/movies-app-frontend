import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon, notification } from 'antd';

import { login } from '../../util/APIUtil';
import { ACCESS_TOKEN } from '../../constants';
import './styles.css';

const FormItem = Form.Item;

class Login extends Component {
  handleLogin = () => {
    notification.success({
      message: 'Movies App',
      description: 'You just logged in.'
    });
    this.props.loadCurrentUser();
    this.props.history.push('/');
  };

  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm);
    return (
      <div className="login-container">
        <h1 className="page-title">Login</h1>
        <div className="login-content">
          <AntWrappedLoginForm onLogin={this.handleLogin} />
        </div>
      </div>
    );
  }
}

class LoginForm extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);

        login(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
          })
          .catch(error => {
            if (error.status === 401) {
              notification.error({
                message: 'Movies App',
                description:
                  'Your username or password is incorrect. Please try again!'
              });
            } else {
              notification.error({
                message: 'Movies App',
                description:
                  error.message || 'Something went wrong, please try again!'
              });
            }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('usernameOrEmail', {
            rules: [
              {
                required: true,
                message: 'Please input your username or email!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" />}
              size="large"
              name="usernameOrEmail"
              placeholder="Username or Email"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="lock" />}
              size="large"
              name="password"
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="login-form-button"
          >
            Login
          </Button>
          Don't have an account? <Link to="/register">Register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(Login);
