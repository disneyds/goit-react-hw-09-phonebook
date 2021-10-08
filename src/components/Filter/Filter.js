import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ filter, handleFilterChange }) {
  return (
    <input
      type="text"
      value={filter}
      onChange={e => handleFilterChange(e.target.value)}
      placeholder="Найти"
      className={s.input}
    ></input>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  handleFilterChange: PropTypes.func.isRequired,
};
