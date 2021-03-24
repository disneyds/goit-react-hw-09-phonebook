import { LinearProgress } from '@material-ui/core';
import ContactEdit from 'components/ContactEdit/ContactEdit';
import Title from 'components/Title/Title';
import React from 'react';
import { useSelector } from 'react-redux';
import { getLoadind } from 'redux/phonebook/phonebookSelectors';

export default function EditContactView() {
  const contactLoading = useSelector(getLoadind);
  return (
    <>
      {contactLoading && <LinearProgress />}
      <Title text="Редактировать контакт" />
      <ContactEdit />
    </>
  );
}
