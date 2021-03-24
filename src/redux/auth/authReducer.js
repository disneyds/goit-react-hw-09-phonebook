import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} from './authActions';
import { getTokenFromLocalStorage } from './authOperations';

const initialState = {
  auth: {
    name: null,
    email: null,
  },
  token: '',
  isLogged: false,
  error: null,
  loading: false,
};

const user = createReducer(initialState.auth, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialState.auth,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
});

const token = createReducer(getTokenFromLocalStorage(), {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const error = createReducer(null, {
  [registerError]: (_, { payload }) => payload.message,
  [loginError]: (_, { payload }) => payload.message,
  [logoutError]: (_, { payload }) => payload.message,
  [getCurrentUserError]: (_, { payload }) => payload.message,
});

const isLogged = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [logoutSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

const loading = createReducer(initialState.loading, {
  [registerRequest]: () => true,
  [loginRequest]: () => true,
  [logoutRequest]: () => true,
  [getCurrentUserRequest]: () => true,
  [registerSuccess]: () => false,
  [loginSuccess]: () => false,
  [logoutSuccess]: () => false,
  [getCurrentUserSuccess]: () => false,
  [registerError]: () => false,
  [loginError]: () => false,
  [logoutError]: () => false,
  [getCurrentUserError]: () => false,
});

export default combineReducers({
  user,
  token,
  error,
  isLogged,
  loading,
});
