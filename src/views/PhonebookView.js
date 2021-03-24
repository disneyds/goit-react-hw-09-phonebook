import { LinearProgress } from '@material-ui/core';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Title from 'components/Title/Title';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading } from 'redux/auth/authSelectors';
import { fetchContacts } from 'redux/phonebook/phonebookOperations';
import { getLoadind } from 'redux/phonebook/phonebookSelectors';

export default function PhonebookView() {
  const dispatch = useDispatch();
  const contactLoading = useSelector(getLoadind);
  const isLoading = useSelector(getLoading);
  useEffect(() => dispatch(fetchContacts()), [dispatch]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Title text="Контакты" />
      <Form />
      <Filter />
      {contactLoading && <LinearProgress />}
      <ContactsList />
    </>
  );
}
