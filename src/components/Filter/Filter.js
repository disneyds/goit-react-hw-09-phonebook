import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getContacts, getFilter } from 'redux/phonebook/phonebookSelectors';
import { CSSTransition } from 'react-transition-group';
import { Box, Paper, TextField } from '@material-ui/core';
import { changeFilter } from 'redux/phonebook/phonebookActions';

function Filter({ contacts, filter, onChange }) {
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

const mapStateToProps = state => ({
  contacts: getContacts(state),
  filter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
