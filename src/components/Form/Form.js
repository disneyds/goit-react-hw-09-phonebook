import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Form.module.css';
import { addContact } from '../../redux/phonebook/phonebookOperations';
import Alert from 'components/Alert/Alert';
import { getContacts } from 'redux/phonebook/phonebookSelectors';

class Form extends Component {
  state = {
    name: '',
    number: '',
    alert: false,
    massage: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onAlert = text => {
    this.setState({
      massage: text,
      alert: true,
    });
    setTimeout(() => {
      this.setState({ massage: '', alert: false });
    }, 3000);
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.name === '') {
      this.onAlert('Пожалуйста, введите имя и телефон');
      return;
    }
    if (this.props.contacts.find(({ name }) => name === this.state.name)) {
      this.onAlert(`Контакт ${this.state.name} уже существует`);
      return;
    }
    this.props.handleSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { massage, alert } = this.state;
    return (
      <>
        <Alert massage={massage} alert={alert} />

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
      </>
    );
  }
}
const mapStateToProps = state => ({
  contacts: getContacts(state),
});
const mapDispatchToProps = dispatch => ({
  handleSubmit: ({ name, number }) => dispatch(addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
