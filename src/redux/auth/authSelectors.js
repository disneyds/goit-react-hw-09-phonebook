export const getIsAuth = state => state.auth.isLogged;

export const getUserName = state => state.auth.user.name;

export const getToken = state => state.auth.token;

export const getLoading = state => state.auth.loading;

export const getError = state => state.auth.error;
