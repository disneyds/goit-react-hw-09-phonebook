import { AppBar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getIsAuth } from 'redux/auth/authSelectors';
import AuthNav from './AuthNav/AuthNav';
import UserMenu from './UserMenu/UserMenu';

export default function Header() {
  const isAuth = useSelector(getIsAuth);
  return (
    <AppBar position="sticky" color="inherit">
      {isAuth ? <UserMenu /> : <AuthNav />}
    </AppBar>
  );
}
