import React, { Component } from 'react';
import { Button } from 'antd';
import './styles.css';

class NotFound extends Component {
  render() {
    return (
      <div className="page-not-found">
        <h1 className="title">404</h1>
        <div className="desc">The page you're looking for was not found.</div>
        <Button
          className="go-back-btn"
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

export default NotFound;
