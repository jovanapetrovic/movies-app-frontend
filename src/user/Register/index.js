import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  register,
  checkUsernameAvailability,
  checkEmailAvailability
} from '../../util/APIUtil';
import './styles.css';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from '../../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Register extends Component {
  state = {
    name: {
      value: ''
    },
    username: {
      value: ''
    },
    email: {
      value: ''
    },
    password: {
      value: ''
    }
  };

  handleInputChange = (event, validationFun) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue)
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const registerRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value
    };

    register(registerRequest)
      .then(response => {
        notification.success({
          message: 'Movies App',
          description: 'You registered successfully. Please login to continue!'
        });
        this.props.history.push('/login');
      })
      .catch(error => {
        notification.error({
          message: 'Movies App',
          description:
            error.message || 'Something went wrong, please try again!'
        });
      });
  };

  isFormInvalid = () => {
    return !(
      this.state.name.validateStatus === 'success' &&
      this.state.username.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success'
    );
  };

  render() {
    return (
      <div className="signup-container">
        <h1 className="page-title">Register</h1>
        <div className="signup-content">
          <Form onSubmit={this.handleSubmit} className="signup-form">
            <FormItem
              label="Full Name"
              validateStatus={this.state.name.validateStatus}
              help={this.state.name.errorMsg}
            >
              <Input
                size="large"
                name="name"
                autoComplete="off"
                placeholder="Your full name"
                value={this.state.name.value}
                onChange={event =>
                  this.handleInputChange(event, this.validateName)
                }
              />
            </FormItem>
            <FormItem
              label="Username"
              hasFeedback
              validateStatus={this.state.username.validateStatus}
              help={this.state.username.errorMsg}
            >
              <Input
                size="large"
                name="username"
                autoComplete="off"
                placeholder="A unique username"
                value={this.state.username.value}
                onBlur={this.validateUsernameAvailability}
                onChange={event =>
                  this.handleInputChange(event, this.validateUsername)
                }
              />
            </FormItem>
            <FormItem
              label="Email"
              hasFeedback
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}
            >
              <Input
                size="large"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Your email"
                value={this.state.email.value}
                onBlur={this.validateEmailAvailability}
                onChange={event =>
                  this.handleInputChange(event, this.validateEmail)
                }
              />
            </FormItem>
            <FormItem
              label="Password"
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}
            >
              <Input
                size="large"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="A password between 6 to 20 characters"
                value={this.state.password.value}
                onChange={event =>
                  this.handleInputChange(event, this.validatePassword)
                }
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="signup-form-button"
                disabled={this.isFormInvalid()}
              >
                Register
              </Button>
              Already registed? <Link to="/login">Login now!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

  // Validation Functions

  validateName = name => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
  };

  validateEmail = email => {
    if (!email) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email must not be empty'
      };
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email not valid'
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
      };
    }

    return {
      validateStatus: null,
      errorMsg: null
    };
  };

  validateUsername = username => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null
      };
    }
  };

  validateUsernameAvailability = () => {
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === 'error') {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation
        }
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: 'validating',
        errorMsg: null
      }
    });

    checkUsernameAvailability(usernameValue)
      .then(response => {
        if (response.available) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'success',
              errorMsg: null
            }
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'error',
              errorMsg: 'This username is already taken'
            }
          });
        }
      })
      .catch(error => {
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: 'success',
            errorMsg: null
          }
        });
      });
  };

  validateEmailAvailability = () => {
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === 'error') {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation
        }
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: 'validating',
        errorMsg: null
      }
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.available) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'success',
              errorMsg: null
            }
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'error',
              errorMsg: 'This Email is already registered'
            }
          });
        }
      })
      .catch(error => {
        this.setState({
          email: {
            value: emailValue,
            validateStatus: 'success',
            errorMsg: null
          }
        });
      });
  };

  validatePassword = password => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
  };
}

export default Register;
