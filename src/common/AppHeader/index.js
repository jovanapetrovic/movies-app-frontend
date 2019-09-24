import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';

import movieIcon from '../../movie.ico';
import './styles.css';

const Header = Layout.Header;

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">{props.currentUser.name}</div>
        <div className="username-info">@{props.currentUser.username}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={dropdownMenu}
      trigger={['click']}
      getPopupContainer={() =>
        document.getElementsByClassName('profile-menu')[0]
      }
    >
      <span className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} />{' '}
        <Icon type="down" />
      </span>
    </Dropdown>
  );
}

class AppHeader extends Component {
  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.onLogout();
    }
  };

  render() {
    const { currentUser } = this.props;
    let menuItems;

    if (currentUser) {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" className="nav-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="/poll/new">
          <Link to="/poll/new">
            <Icon type="plus-circle" className="nav-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="/movies">
          <Link to="/movies">
            <Icon type="database" className="nav-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="/profile" className="profile-menu">
          <ProfileDropdownMenu
            currentUser={currentUser}
            handleMenuClick={this.handleMenuClick}
          />
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      ];
    }

    return (
      <Header className="app-header">
        <div className="container">
          <div className="app-title">
            <Link to="/">
              <img src={movieIcon} alt="movie app icon" />
              Movies App
            </Link>
          </div>
          <Menu
            className="app-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            {menuItems}
          </Menu>
        </div>
      </Header>
    );
  }
}

export default withRouter(AppHeader);
