import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/phonebook/phonebookActions';
import { getContacts, getFilter } from 'redux/phonebook/phonebookSelectors';
import { CSSTransition } from 'react-transition-group';

function Filter({ contacts, filter, onChange }) {
  return (
    <CSSTransition
      in={contacts.length > 1}
      timeout={250}
      classNames="Filter"
      unmountOnExit
    >
      <input
        type="text"
        value={filter}
        onChange={onChange}
        placeholder="Найти"
        className={s.input}
      ></input>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  contacts: getContacts(state),
  filter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
