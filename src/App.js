import React, { Component } from 'react';
import './App.css';
import Container from './components/Container/Container';
import { v4 as uuid } from 'uuid';
import Form from './components/Form/Form';
import ContactsList from './components/ContactsList/ContactsList';
import Filter from './components/Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmitForm = contact => {
    const { contacts } = this.state;

    if (contact.name === '') {
      alert('Пожалуйста, введите имя и телефон');
      return;
    }

    if (contacts.find(({ name }) => name === contact.name)) {
      alert(`${contact.name} уже существует`);
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
        <div className="phoneBook">
          <h1>Телефонная книга</h1>
          <Form handleSubmit={this.handleSubmitForm} />
          <h2>Контакты</h2>
          {this.state.contacts.length > 1 && (
            <Filter
              filter={this.state.filter}
              handleFilterChange={this.handleFilterChange}
            />
          )}
          <ContactsList contacts={visibleConatacts} onDelete={this.onDelete} />
        </div>
      </Container>
    );
  }
}
