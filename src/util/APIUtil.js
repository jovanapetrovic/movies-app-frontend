import { API_URL, POLLS_SIZE, ACCESS_TOKEN } from '../constants';

const request = options => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

// LOGIN & REGISTER

export function login(loginRequest) {
  return request({
    url: API_URL + '/auth/login',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

export function register(registerRequest) {
  return request({
    url: API_URL + '/auth/register',
    method: 'POST',
    body: JSON.stringify(registerRequest)
  });
}

export function checkUsernameAvailability(username) {
  return request({
    url: API_URL + '/user/checkIfAvailableUsername?username=' + username,
    method: 'GET'
  });
}

export function checkEmailAvailability(email) {
  return request({
    url: API_URL + '/user/checkIfAvailableEmail?email=' + email,
    method: 'GET'
  });
}

// USER & PROFILE

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return request({
    url: API_URL + '/user/me',
    method: 'GET'
  });
}

export function getUserProfile(username) {
  return request({
    url: API_URL + '/users/' + username,
    method: 'GET'
  });
}

export function getCreatedPolls(username, page, size) {
  page = page || 0;
  size = size || POLLS_SIZE;

  return request({
    url:
      API_URL + '/users/' + username + '/polls?page=' + page + '&size=' + size,
    method: 'GET'
  });
}

export function getVotedPolls(username, page, size) {
  page = page || 0;
  size = size || POLLS_SIZE;

  return request({
    url:
      API_URL + '/users/' + username + '/votes?page=' + page + '&size=' + size,
    method: 'GET'
  });
}

// POLLS

export function getAllPolls(page, size) {
  page = page || 0;
  size = size || POLLS_SIZE;

  return request({
    url: API_URL + '/polls?page=' + page + '&size=' + size,
    method: 'GET'
  });
}

export function createPoll(pollData) {
  return request({
    url: API_URL + '/polls',
    method: 'POST',
    body: JSON.stringify(pollData)
  });
}

export function submitVote(voteData) {
  return request({
    url: API_URL + '/polls/' + voteData.pollId + '/votes',
    method: 'POST',
    body: JSON.stringify(voteData)
  });
}

// CATEGORIES

export function getAllCategories() {
  return request({
    url: API_URL + '/categories',
    method: 'GET'
  });
}

// MOVIES

export function getWatchedMovies() {
  return request({
    url: API_URL + '/movies',
    method: 'GET'
  });
}

export function createMovie(movieData) {
  return request({
    url: API_URL + '/movies',
    method: 'POST',
    body: JSON.stringify(movieData)
  });
}

export function updateMovie(movieData) {
  return request({
    url: API_URL + '/movies/' + movieData.movieId,
    method: 'PUT',
    body: JSON.stringify(movieData)
  });
}

export function deleteMovie(movieData) {
  return request({
    url: API_URL + '/movies/' + movieData.movieId,
    method: 'DELETE',
    body: JSON.stringify(movieData)
  });
}
