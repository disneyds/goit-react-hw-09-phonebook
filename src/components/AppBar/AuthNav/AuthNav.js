import { Box, Button, ButtonGroup } from '@material-ui/core';
import paths from 'components/Routes/paths';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

export default function Auth() {
  const history = useHistory();
  const { pathname } = useLocation();

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
