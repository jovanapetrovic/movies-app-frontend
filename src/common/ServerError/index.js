import React, { Component } from 'react';
import { Button } from 'antd';
import './styles.css';

class ServerError extends Component {
  render() {
    return (
      <div className="server-error-page">
        <h1 className="server-error-title">500</h1>
        <div className="server-error-desc">
          Oops! Something went wrong with the server. Why don't you go back?
        </div>
        <Button
          className="server-error-go-back-btn"
          type="primary"
          size="large"
          onClick={this.props.history.goBack}
        >
          Go Back
        </Button>
      </div>
    );
  }
}
export default ServerError;
