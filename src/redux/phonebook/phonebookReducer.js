import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import phonebookActions from './phonebookActions';
import { loadContacts } from '../../services/localData';

const contactsReducer = createReducer(loadContacts(), {
  [phonebookActions.addContact]: (state, { payload }) => [payload, ...state],
  [phonebookActions.deleteContact]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
  [phonebookActions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
