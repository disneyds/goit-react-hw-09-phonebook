import React, { Component } from 'react';
import './App.css';
import Container from './components/Container/Container';
import { v4 as uuid } from 'uuid';
import Form from './components/Form/Form';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';
import { CSSTransition } from 'react-transition-group';
import Alert from 'components/Alert/Alert';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    alert: false,
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('numbers'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('numbers', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmitForm = contact => {
    const { contacts } = this.state;

    if (contact.name === '') {
      alert('Пожалуйста, введите имя и телефон');
      return;
    }

    if (contacts.find(({ name }) => name === contact.name)) {
      this.setState({ alert: true });
      setTimeout(() => {
        this.setState({ alert: false });
      }, 3000);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            name: contact.name,
            number: contact.number,
            id: uuid(),
          },
        ],
      };
    });

    this.setState({
      name: '',
      number: '',
    });
  };

  visibleConatacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  onDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleConatacts = this.visibleConatacts();
    return (
      <Container>
        <CSSTransition
          in={this.state.alert}
          timeout={250}
          classNames="Alert"
          unmountOnExit
        >
          <Alert />
        </CSSTransition>
        <div className="phoneBook">
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames="Title"
            unmountOnExit
          >
            <h1>Контакты</h1>
          </CSSTransition>
          <Form handleSubmit={this.handleSubmitForm} />

          <CSSTransition
            in={this.state.contacts.length > 1}
            timeout={250}
            classNames="Filter"
            unmountOnExit
          >
            <Filter
              filter={this.state.filter}
              handleFilterChange={this.handleFilterChange}
            />
          </CSSTransition>
          <ContactsList contacts={visibleConatacts} onDelete={this.onDelete} />
        </div>
      </Container>
    );
  }
}
