import React, { Component } from 'react';
import { Avatar, Tabs } from 'antd';
import Polls from '../../poll/Polls';
import { getUserProfile } from '../../util/APIUtil';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/FormatDateUtil';
import LoadingBar from '../../common/LoadingBar';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';
import './styles.css';

const TabPane = Tabs.TabPane;

class Profile extends Component {
  state = {
    user: null,
    isLoading: false
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }

  componentDidUpdate(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.loadUserProfile(this.props.match.params.username);
    }
  }

  loadUserProfile = username => {
    this.setState({ isLoading: true });

    getUserProfile(username)
      .then(response => {
        this.setState({
          user: response,
          isLoading: false
        });
      })
      .catch(error => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoading: false
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false
          });
        }
      });
  };

  render() {
    const { isLoading, notFound, serverError, user } = this.state;

    if (isLoading) return <LoadingBar />;
    if (notFound) return <NotFound />;
    if (serverError) return <ServerError />;

    const tabBarStyle = {
      textAlign: 'center'
    };

    return (
      <div className="profile">
        {user && (
          <div className="user-profile">
            <div className="user-details">
              <div className="user-avatar">
                <Avatar
                  className="user-avatar-circle"
                  style={{
                    backgroundColor: getAvatarColor(user.name)
                  }}
                >
                  {user.name[0].toUpperCase()}
                </Avatar>
              </div>
              <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
                <div className="user-joined">
                  Joined {formatDate(user.joinedAt)}
                </div>
              </div>
            </div>
            <div className="user-poll-details">
              <Tabs
                defaultActiveKey="1"
                animated={false}
                tabBarStyle={tabBarStyle}
                size="large"
                className="profile-tabs"
              >
                <TabPane tab={`${user.pollCount} poll(s)`} key="1">
                  <Polls
                    isAuthenticated={this.props.isAuthenticated}
                    username={this.props.match.params.username}
                    type="CREATED_POLLS"
                  />
                </TabPane>
                <TabPane tab={`${user.voteCount} vote(s)`} key="2">
                  <Polls
                    isAuthenticated={this.props.isAuthenticated}
                    username={this.props.match.params.username}
                    type="VOTED_POLLS"
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
