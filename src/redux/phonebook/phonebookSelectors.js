import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.phonebook.contacts;

export const getFilter = state => state.phonebook.filter;

export const getLoadind = state => state.phonebook.loading;

export const getError = state => state.phonebook.error;

export const getVisibleConatacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    ),
);
