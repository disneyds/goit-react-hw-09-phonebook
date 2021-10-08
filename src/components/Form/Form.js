import React, { Component } from 'react';
import s from './Form.module.css';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={s.form} onSubmit={this.onSubmitForm}>
        <label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Имя"
            className={s.input}
          ></input>
        </label>
        <label>
          <input
            type="tel"
            name="number"
            onChange={this.handleChange}
            value={this.state.number}
            placeholder="Телефон"
            className={s.input}
          ></input>
        </label>
        <button type="submit" className={s.button}>
          Создать контакт
        </button>
      </form>
    );
  }
}
