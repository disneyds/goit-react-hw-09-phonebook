// import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook/phonebookReducer';
import authReducer from './auth/authReducer';

const middleware = [...getDefaultMiddleware()];
const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
    auth: authReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
