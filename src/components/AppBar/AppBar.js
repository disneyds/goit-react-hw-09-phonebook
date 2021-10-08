import { AppBar } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getIsAuth } from 'redux/auth/authSelectors';
import AuthNav from './AuthNav/AuthNav';
import UserMenu from './UserMenu/UserMenu';

function Header({ isAuth }) {
  return (
    <AppBar position="sticky" color="inherit">
      {isAuth ? <UserMenu /> : <AuthNav />}
    </AppBar>
  );
}

const mapStateToProps = state => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps)(Header);
