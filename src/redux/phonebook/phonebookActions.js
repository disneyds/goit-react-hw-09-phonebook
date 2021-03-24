import { createAction } from '@reduxjs/toolkit';

export const fetchContactRequest = createAction('contact/fetchRequest');
export const fetchContactSuccess = createAction('contact/fetchSuccess');
export const fetchContactError = createAction('contact/fetchError');

export const addContactRequest = createAction('contact/addRequest');
export const addContactSuccess = createAction('contact/addSuccess');
export const addContactError = createAction('contact/addError');

export const deleteContactRequest = createAction('contact/deleteRequest');
export const deleteContactSuccess = createAction('contact/deleteSuccess');
export const deleteContactError = createAction('contact/deleteError');

export const editContactRequest = createAction('contacts/editContactRequest');
export const editContactSuccess = createAction('contacts/editContactSuccess');
export const editContactError = createAction('contacts/editContactError');

export const changeFilter = createAction('contact/changeFilter');
