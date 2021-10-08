import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import { connect } from 'react-redux';
import actions from '../../redux/phonebook/phonebookActions';

function Filter({ filter, onChange }) {
  return (
    <input
      type="text"
      value={filter}
      onChange={onChange}
      placeholder="Найти"
      className={s.input}
    ></input>
  );
}

const mapStateToProps = state => ({
  filter: state.phonebook.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(actions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
