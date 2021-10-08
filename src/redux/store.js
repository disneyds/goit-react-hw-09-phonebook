import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook/phonebookReducer';
import { saveContacts } from '../services/localData';

const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

store.subscribe(() => {
  saveContacts(store.getState().phonebook.contacts);
});

export default store;
