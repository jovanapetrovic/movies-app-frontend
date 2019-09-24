import { notification } from 'antd';
import {
  POLLS_LOADING_START,
  POLLS_LOADING_FINISH,
  SET_POLLS,
  UPDATE_CURRENT_VOTES,
  VOTE_ON_POLL
} from '../types';
import {
  getAllPolls,
  getCreatedPolls,
  getVotedPolls,
  submitVote
} from '../../util/APIUtil';

export const loadCreatedPolls = (username, page, size) => dispatch => {
  dispatch({ type: POLLS_LOADING_START });

  getCreatedPolls(username, page, size)
    .then(pollData => {
      dispatch({
        type: SET_POLLS,
        payload: pollData
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to load created polls, please try again!'
      });

      dispatch({ type: POLLS_LOADING_FINISH });
    });
};

export const loadVotedPolls = (username, page, size) => dispatch => {
  dispatch({ type: POLLS_LOADING_START });

  getVotedPolls(username, page, size)
    .then(pollData => {
      dispatch({
        type: SET_POLLS,
        payload: pollData
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to load voted polls, please try again!'
      });

      dispatch({ type: POLLS_LOADING_FINISH });
    });
};

export const loadAllPolls = (page, size) => dispatch => {
  dispatch({ type: POLLS_LOADING_START });

  getAllPolls(page, size)
    .then(pollData => {
      dispatch({
        type: SET_POLLS,
        payload: pollData
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to load polls, please try again!'
      });

      dispatch({ type: POLLS_LOADING_FINISH });
    });
};

export const updateCurrentVotes = currentVotes => ({
  type: UPDATE_CURRENT_VOTES,
  payload: currentVotes
});

export const voteOnPoll = (voteData, pollIndex) => dispatch => {
  submitVote(voteData)
    .then(response => {
      dispatch({
        type: VOTE_ON_POLL,
        payload: response,
        pollIndex
      });
    })
    .catch(error => {
      notification.error({
        message: 'Movies App',
        description: 'Unable to vote on poll, please try again!'
      });
    });
};
