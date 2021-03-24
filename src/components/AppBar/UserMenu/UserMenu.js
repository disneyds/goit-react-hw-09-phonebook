import { Avatar, Box, Button, Grid, Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/auth/authOperations';
import { getUserName } from 'redux/auth/authSelectors';

export default function UserMenu({ avatar }) {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <>
      <Box p={3}>
        <Grid container spacing={1} justify="space-around" alignItems="center">
          {avatar ? avatar : <Avatar>{name[0].toUpperCase()}</Avatar>}
          <Typography variant="subtitle1">{name}</Typography>
          <Button
            type="button"
            onClick={onLogout}
            variant="contained"
            endIcon={<ExitToApp />}
          >
            Выйти
          </Button>
        </Grid>
      </Box>
    </>
  );
}
