import { createAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const addContact = createAction('contact/add', (name, number) => ({
  payload: {
    name,
    number,
    id: uuid(),
  },
}));
const deleteContact = createAction('contact/delete');
const changeFilter = createAction('contact/changeFilter');

export default { addContact, deleteContact, changeFilter };
