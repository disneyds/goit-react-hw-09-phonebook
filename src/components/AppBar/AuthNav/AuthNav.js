import { Box, Button, ButtonGroup } from '@material-ui/core';
import paths from 'components/Routes/paths';
import React from 'react';
import { withRouter } from 'react-router';

function Auth({ history, location: { pathname } }) {
  return (
    <Box p={3}>
      <ButtonGroup
        fullWidth
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button
          color="primary"
          variant={pathname === paths.LOGIN ? 'contained' : 'text'}
          onClick={() => {
            history.push(paths.LOGIN);
          }}
        >
          Логин
        </Button>

        <Button
          color="primary"
          onClick={() => {
            history.push(paths.REGISTER);
          }}
          variant={pathname === paths.REGISTER ? 'contained' : 'text'}
        >
          Регистрация
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default withRouter(Auth);
