import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';

import { loadCurrentUser, logoutUser } from './store/actions/auth';

import Polls from './poll/Polls';
import NewPoll from './poll/NewPoll';
import Movies from './movie/Movies/Movies';
import Login from './user/Login';
import Register from './user/Register';
import Profile from './user/Profile';
import AppHeader from './common/AppHeader';
import NotFound from './common/NotFound';
import LoadingBar from './common/LoadingBar';
import GuestRoute from './common/GuestRoute';
import SecureRoute from './common/SecureRoute';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  componentDidMount() {
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3
    });
  }

  render() {
    const {
      currentUser,
      isAuthenticated,
      isLoading,
      logoutUser,
      loadCurrentUser
    } = this.props;

    if (isLoading) return <LoadingBar />;

    return (
      <Layout className="app-container">
        <AppHeader
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogout={logoutUser}
        />

        <Content className="app-content">
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Polls
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    {...props}
                  />
                )}
              />
              <GuestRoute
                authenticated={isAuthenticated}
                path="/login"
                component={Login}
                loadCurrentUser={loadCurrentUser}
              />
              <GuestRoute
                authenticated={isAuthenticated}
                path="/register"
                component={Register}
              />
              <Route
                path="/users/:username"
                render={props => (
                  <Profile
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    {...props}
                  />
                )}
              />
              <SecureRoute
                authenticated={isAuthenticated}
                path="/poll/new"
                component={NewPoll}
              />
              <SecureRoute
                authenticated={isAuthenticated}
                path="/movies"
                component={Movies}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
  isLoading: auth.isLoading,
  isAuthenticated: auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadCurrentUser, logoutUser }
)(withRouter(App));
