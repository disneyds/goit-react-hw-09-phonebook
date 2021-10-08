import axios from 'axios';
import { toast } from 'react-toastify';
import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
} from './phonebookActions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

export const fetchContacts = () => dispatch => {
  dispatch(fetchContactRequest());

  axios
    .get('/contacts')
    .then(({ data }) => {
      dispatch(fetchContactSuccess(data));
    })
    .catch(error => {
      dispatch(fetchContactError(error));
      if (error.response.status === 404) toast.info('Тут ещё нет контактов.');
    });
};

export const addContact = (name, number) => dispatch => {
  const contact = {
    name,
    number,
  };

  dispatch(addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => {
      dispatch(addContactSuccess(data));
    })
    .catch(error => {
      dispatch(addContactError(error));
      if (error.response.status === 400)
        toast.warn('Неудалось создать контакт. Попробуйте ещё раз!');
    });
};

export const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => {
      dispatch(deleteContactSuccess(id));
    })
    .catch(error => {
      dispatch(deleteContactError(error));
      if (error.response.status === 404)
        toast.warn('Контакт уже удалён, попробуйте перезайти!');
    });
};

export const editContact = ({ id, name, number }) => async dispatch => {
  dispatch(editContactRequest());

  try {
    await axios.patch(`/contacts/${id}`, { name, number });
    dispatch(editContactSuccess());
  } catch (error) {
    dispatch(editContactError(error));
    if (error.response.status === 404)
      toast.warn('Контакт уже обновлён, попробуйте перезайти!');
    if (error.response.status === 401)
      toast.warn('Что-то пошло не так, попробуйте перезайти!');
  }
};
