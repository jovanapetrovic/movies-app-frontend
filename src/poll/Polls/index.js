import React, { Component } from 'react';
import { Button, Icon, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadCreatedPolls,
  loadVotedPolls,
  loadAllPolls,
  updateCurrentVotes,
  voteOnPoll
} from '../../store/actions/polls';
import Poll from '../Poll';
import LoadingBar from '../../common/LoadingBar';
import { POLLS_SIZE } from '../../constants';
import './styles.css';

class Polls extends Component {
  componentDidMount() {
    this.loadPolls();
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadPolls();
    }
  }

  loadPolls = (page = 0, size = POLLS_SIZE) => {
    if (this.props.username) {
      if (this.props.type === 'CREATED_POLLS') {
        this.props.loadCreatedPolls(this.props.username, page, size);
      } else if (this.props.type === 'VOTED_POLLS') {
        this.props.loadVotedPolls(this.props.username, page, size);
      }
    } else {
      this.props.loadAllPolls(page, size);
    }
  };

  handleLoadMore = () => {
    this.loadPolls(this.props.page + 1);
  };

  handleVoteChange = (event, pollIndex) => {
    const currentVotes = this.props.currentVotes.slice();
    currentVotes[pollIndex] = event.target.value;
    this.props.updateCurrentVotes(currentVotes);
  };

  handleVoteSubmit = (event, pollIndex) => {
    event.preventDefault();
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
      notification.info({
        message: 'Movies App',
        description: 'Please login in order to vote.'
      });
      return;
    }

    const poll = this.props.polls[pollIndex];
    const selectedOption = this.props.currentVotes[pollIndex];

    const voteData = {
      pollId: poll.id,
      optionId: selectedOption
    };

    this.props.voteOnPoll(voteData, pollIndex);
  };

  render() {
    const { polls, currentVotes, isLoading, last } = this.props;

    const pollViews = [];
    polls.forEach((poll, pollIndex) => {
      pollViews.push(
        <Poll
          key={poll.id}
          poll={poll}
          currentVote={currentVotes[pollIndex]}
          handleVoteChange={event => this.handleVoteChange(event, pollIndex)}
          handleVoteSubmit={event => this.handleVoteSubmit(event, pollIndex)}
        />
      );
    });

    return (
      <div className="polls-container">
        {pollViews}
        {!isLoading && polls.length === 0 ? (
          <div className="no-polls-found">
            <span>No polls found.</span>
          </div>
        ) : null}
        {!isLoading && !last ? (
          <div className="load-more-polls">
            <Button
              type="dashed"
              onClick={this.handleLoadMore}
              disabled={isLoading}
            >
              <Icon type="plus" /> Load more
            </Button>
          </div>
        ) : null}
        {isLoading ? <LoadingBar /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ polls }) => ({
  polls: polls.content,
  page: polls.page,
  size: polls.size,
  totalElements: polls.totalElements,
  totalPages: polls.totalPages,
  last: polls.last,
  currentVotes: polls.currentVotes,
  isLoading: polls.isLoading
});

export default connect(
  mapStateToProps,
  {
    loadCreatedPolls,
    loadVotedPolls,
    loadAllPolls,
    updateCurrentVotes,
    voteOnPoll
  }
)(withRouter(Polls));
