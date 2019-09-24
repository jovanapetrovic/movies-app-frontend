import React, { Component } from 'react';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
import { createPoll } from '../../util/APIUtil';
import PollOption from '../PollOption';
import {
  MAX_OPTIONS,
  POLL_QUESTION_MAX_LENGTH,
  POLL_OPTION_MAX_LENGTH
} from '../../constants';
import './styles.css';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class NewPoll extends Component {
  state = {
    question: {
      text: ''
    },
    options: [
      {
        text: ''
      },
      {
        text: ''
      }
    ],
    pollDuration: {
      days: 1,
      hours: 0
    }
  };

  addOption = event => {
    const options = this.state.options.slice();
    this.setState({
      options: options.concat([
        {
          text: ''
        }
      ])
    });
  };

  removeOption = optionNumber => {
    const options = this.state.options.slice();
    this.setState({
      options: [
        ...options.slice(0, optionNumber),
        ...options.slice(optionNumber + 1)
      ]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const pollData = {
      question: this.state.question.text,
      options: this.state.options.map(option => {
        return { text: option.text };
      }),
      pollDuration: this.state.pollDuration
    };

    createPoll(pollData)
      .then(response => {
        this.props.history.push('/');
      })
      .catch(error => {
        notification.error({
          message: 'Movies App',
          description:
            error.message || 'Something went wrong, please try again!'
        });
      });
  };

  validateQuestion = questionText => {
    if (questionText.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'You must enter a question!'
      };
    } else if (questionText.length > POLL_QUESTION_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
  };

  handleQuestionChange = event => {
    const value = event.target.value;
    this.setState({
      question: {
        text: value,
        ...this.validateQuestion(value)
      }
    });
  };

  validateOption = optionText => {
    if (optionText.length === 0) {
      return {
        validateStatus: 'error',
        errorMsg: 'You must enter option text!'
      };
    } else if (optionText.length > POLL_OPTION_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Option is too long (Maximum ${POLL_OPTION_MAX_LENGTH} characters allowed)`
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
      };
    }
  };

  handleOptionChange = (event, index) => {
    const options = this.state.options.slice();
    const value = event.target.value;

    options[index] = {
      text: value,
      ...this.validateOption(value)
    };

    this.setState({
      options: options
    });
  };

  handlePollDaysChange = value => {
    const pollDuration = Object.assign(this.state.pollDuration, {
      days: value
    });
    this.setState({
      pollDuration: pollDuration
    });
  };

  handlePollHoursChange = value => {
    const pollDuration = Object.assign(this.state.pollDuration, {
      hours: value
    });
    this.setState({
      pollDuration: pollDuration
    });
  };

  isFormInvalid = () => {
    if (this.state.question.validateStatus !== 'success') {
      return true;
    }

    for (let i = 0; i < this.state.options.length; i++) {
      const option = this.state.options[i];
      if (option.validateStatus !== 'success') {
        return true;
      }
    }
  };

  render() {
    const optionViews = [];
    this.state.options.forEach((option, index) => {
      optionViews.push(
        <PollOption
          key={index}
          option={option}
          optionNumber={index}
          removeOption={this.removeOption}
          handleOptionChange={this.handleOptionChange}
        />
      );
    });

    return (
      <div className="new-poll-container">
        <h1 className="page-title">Create new movie poll</h1>
        <div className="new-poll-content">
          <Form onSubmit={this.handleSubmit} className="create-poll-form">
            <FormItem
              validateStatus={this.state.question.validateStatus}
              help={this.state.question.errorMsg}
              className="poll-form-row"
            >
              <TextArea
                placeholder="Add your question"
                style={{ fontSize: '16px' }}
                autosize={{ minRows: 3, maxRows: 6 }}
                name="question"
                value={this.state.question.text}
                onChange={this.handleQuestionChange}
              />
            </FormItem>
            {optionViews}
            <FormItem className="poll-form-row">
              <Button
                type="dashed"
                onClick={this.addOption}
                disabled={this.state.options.length === MAX_OPTIONS}
              >
                <Icon type="plus" /> Add another option
              </Button>
            </FormItem>
            <FormItem className="poll-form-row">
              <Col xs={24} sm={4}>
                Poll duration:
              </Col>
              <Col xs={24} sm={20}>
                <span style={{ marginRight: '18px' }}>
                  <Select
                    name="days"
                    defaultValue="1"
                    onChange={this.handlePollDaysChange}
                    value={this.state.pollDuration.days}
                    style={{ width: 60 }}
                  >
                    {Array.from(Array(8).keys()).map(i => (
                      <Option key={i}>{i}</Option>
                    ))}
                  </Select>{' '}
                  &nbsp;Days
                </span>
                <span>
                  <Select
                    name="hours"
                    defaultValue="0"
                    onChange={this.handlePollHoursChange}
                    value={this.state.pollDuration.hours}
                    style={{ width: 60 }}
                  >
                    {Array.from(Array(24).keys()).map(i => (
                      <Option key={i}>{i}</Option>
                    ))}
                  </Select>{' '}
                  &nbsp;Hours
                </span>
              </Col>
            </FormItem>
            <FormItem className="poll-form-row">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={this.isFormInvalid()}
                className="create-poll-form-button"
              >
                Create poll
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewPoll;
