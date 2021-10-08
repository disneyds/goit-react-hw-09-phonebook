import types from './phonebookTypes';
import { v4 as uuid } from 'uuid';

const addContact = (name, number) => ({
  type: types.ADD,
  payload: {
    name,
    number,
    id: uuid(),
  },
});

const deleteContact = id => ({
  type: types.DELETE,
  payload: id,
});

const changeFilter = value => ({
  type: types.CHANGE_FILTER,
  payload: value,
});

export default { addContact, deleteContact, changeFilter };
