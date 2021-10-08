import { LinearProgress } from '@material-ui/core';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Title from 'components/Title/Title';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoading } from 'redux/auth/authSelectors';
import { fetchContacts } from 'redux/phonebook/phonebookOperations';
import { getLoadind } from 'redux/phonebook/phonebookSelectors';

class PhonebookView extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <>
        {this.props.isLoading && <LinearProgress />}
        <Title text="Контакты" />
        <Form />
        <Filter />
        {this.props.contactLoading && <LinearProgress />}
        <ContactsList />
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  contactLoading: getLoadind(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookView);
