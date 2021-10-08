import { LinearProgress } from '@material-ui/core';
import ContactEdit from 'components/ContactEdit/ContactEdit';
import Title from 'components/Title/Title';
import React from 'react';
import { connect } from 'react-redux';
import { getContacts, getLoadind } from 'redux/phonebook/phonebookSelectors';

const EditContactView = ({ contactLoading }) => {
  return (
    <>
      {contactLoading && <LinearProgress />}
      <Title text="Редактировать контакт" />
      <ContactEdit />
    </>
  );
};

const mapStateToProps = state => ({
  contactLoading: getLoadind(state),
  contacts: getContacts(state),
});

export default connect(mapStateToProps)(EditContactView);
