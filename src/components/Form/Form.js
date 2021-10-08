import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './Form.module.css';
import phonebookActions from '../../redux/phonebook/phonebookActions';
import { CSSTransition } from 'react-transition-group';
import Alert from 'components/Alert/Alert';

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

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.name === '') {
      this.setState({
        massage: 'Пожалуйста, введите имя и телефон',
        alert: true,
      });
      setTimeout(() => {
        this.setState({ massage: '', alert: false });
      }, 3000);
      return;
    }
    if (this.props.contacts.find(({ name }) => name === this.state.name)) {
      this.setState({
        massage: `Контакт ${this.state.name} уже существует`,
        alert: true,
      });
      setTimeout(() => {
        this.setState({ massage: '', alert: false });
      }, 3000);
      return;
    }
    this.props.handleSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <CSSTransition
          in={this.state.alert}
          timeout={250}
          classNames={s}
          unmountOnExit
        >
          <Alert massage={this.state.massage} />
        </CSSTransition>
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
  contacts: state.phonebook.contacts,
});
const mapDispatchToProps = dispatch => ({
  handleSubmit: ({ name, number }) =>
    dispatch(phonebookActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
