import {
  POLLS_LOADING_START,
  POLLS_LOADING_FINISH,
  SET_POLLS,
  UPDATE_CURRENT_VOTES,
  VOTE_ON_POLL
} from '../types';

const INITIAL_STATE = {
  content: [],
  page: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  last: true,
  currentVotes: [],
  isLoading: false
};

export default function pollsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POLLS_LOADING_START:
      return {
        ...state,
        isLoading: true
      };
    case POLLS_LOADING_FINISH:
      return {
        ...state,
        isLoading: false
      };
    case SET_POLLS:
      const currentVotes = state.currentVotes.slice();

      return {
        ...state,
        ...action.payload,
        isLoading: false,
        currentVotes: currentVotes.concat(
          Array(action.payload.content.length).fill(null)
        )
      };
    case UPDATE_CURRENT_VOTES:
      return {
        ...state,
        currentVotes: action.payload
      };
    case VOTE_ON_POLL:
      const polls = state.content.slice();
      polls[action.pollIndex] = action.payload;
      return {
        ...state,
        content: polls
      };
    default:
      return state;
  }
}
