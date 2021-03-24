import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/phonebook/phonebookSelectors';
import { CSSTransition } from 'react-transition-group';
import { Box, Paper, TextField } from '@material-ui/core';
import { changeFilter } from 'redux/phonebook/phonebookActions';

export default function Filter() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = useCallback(
    e => {
      dispatch(changeFilter(e.target.value));
    },
    [dispatch],
  );
  return (
    <CSSTransition
      in={contacts.length > 1}
      timeout={250}
      classNames="Filter"
      unmountOnExit
    >
      <Paper elevation={3}>
        <Box p={3} mt={1} mb={1}>
          <TextField
            fullWidth
            label="Найти"
            variant="filled"
            type="text"
            onChange={onChange}
            value={filter}
          />
        </Box>
      </Paper>
    </CSSTransition>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
