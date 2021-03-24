import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuth, getToken } from 'redux/auth/authSelectors';

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuth = useSelector(getIsAuth);
  const token = useSelector(getToken);

  return (
    <Route
      {...routeProps}
      render={props =>
        isAuth || token ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
}
