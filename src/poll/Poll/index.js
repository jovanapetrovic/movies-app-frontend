import React, { Component } from 'react';
import { Radio, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import CVPollOption from '../CVPollOption';
import { getAvatarColor } from '../../util/Colors';
import { formatDateTime } from '../../util/FormatDateUtil';
import './styles.css';

const RadioGroup = Radio.Group;

class Poll extends Component {
  calculatePercentage = option => {
    if (this.props.poll.totalVotes === 0) {
      return 0;
    }
    return (option.voteCount * 100) / this.props.poll.totalVotes;
  };

  isSelected = option => {
    return this.props.poll.selectedOption === option.id;
  };

  getWinningOption = () => {
    return this.props.poll.options.reduce(
      (prevOption, currentOption) =>
        currentOption.voteCount > prevOption.voteCount
          ? currentOption
          : prevOption,
      { voteCount: -Infinity }
    );
  };

  getTimeRemaining = poll => {
    const expirationTime = new Date(poll.expirationDateTime).getTime();
    const currentTime = new Date().getTime();

    var difference_ms = expirationTime - currentTime;
    var seconds = Math.floor((difference_ms / 1000) % 60);
    var minutes = Math.floor((difference_ms / 1000 / 60) % 60);
    var hours = Math.floor((difference_ms / (1000 * 60 * 60)) % 24);
    var days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));

    let timeRemaining;

    if (days > 0) {
      timeRemaining = days + ' days left';
    } else if (hours > 0) {
      timeRemaining = hours + ' hours left';
    } else if (minutes > 0) {
      timeRemaining = minutes + ' minutes left';
    } else if (seconds > 0) {
      timeRemaining = seconds + ' seconds left';
    } else {
      timeRemaining = 'less than a second left';
    }

    return timeRemaining;
  };

  render() {
    const pollOptions = [];
    if (this.props.poll.selectedOption || this.props.poll.expired) {
      const winningOption = this.props.poll.expired
        ? this.getWinningOption()
        : null;

      this.props.poll.options.forEach(option => {
        pollOptions.push(
          <CVPollOption
            key={option.id}
            option={option}
            isWinner={winningOption && option.id === winningOption.id}
            isSelected={this.isSelected(option)}
            percentVote={this.calculatePercentage(option)}
          />
        );
      });
    } else {
      this.props.poll.options.forEach(option => {
        pollOptions.push(
          <Radio
            className="poll-option-radio"
            key={option.id}
            value={option.id}
          >
            {option.text}
          </Radio>
        );
      });
    }
    return (
      <div className="poll-content">
        <div className="poll-header">
          <div className="poll-creator-info">
            <Link
              className="creator-link"
              to={`/users/${this.props.poll.createdBy.username}`}
            >
              <Avatar
                className="poll-creator-avatar"
                style={{
                  backgroundColor: getAvatarColor(
                    this.props.poll.createdBy.name
                  )
                }}
              >
                {this.props.poll.createdBy.name[0].toUpperCase()}
              </Avatar>
              <span className="poll-creator-name">
                {this.props.poll.createdBy.name}
              </span>
              <span className="poll-creator-username">
                @{this.props.poll.createdBy.username}
              </span>
              <span className="poll-creation-date">
                {formatDateTime(this.props.poll.dateCreated)}
              </span>
            </Link>
          </div>
          <div className="poll-question">{this.props.poll.question}</div>
        </div>
        <div className="poll-options">
          <RadioGroup
            className="poll-option-radio-group"
            onChange={this.props.handleVoteChange}
            value={this.props.currentVote}
          >
            {pollOptions}
          </RadioGroup>
        </div>
        <div className="poll-footer">
          {!(this.props.poll.selectedOption || this.props.poll.expired) ? (
            <Button
              className="vote-button"
              disabled={!this.props.currentVote}
              onClick={this.props.handleVoteSubmit}
            >
              Vote
            </Button>
          ) : null}
          <span className="total-votes">
            {this.props.poll.totalVotes} votes
          </span>
          <span className="separator">•</span>
          <span className="time-left">
            {this.props.poll.expired
              ? 'Final results'
              : this.getTimeRemaining(this.props.poll)}
          </span>
        </div>
      </div>
    );
  }
}

export default Poll;
