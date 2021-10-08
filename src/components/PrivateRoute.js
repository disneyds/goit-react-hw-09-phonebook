import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsAuth } from 'redux/auth/authSelectors';

const PrivateRoute = ({
  component: Component,
  isAuth,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuth ? <Component {...props} /> : <Redirect to={redirectTo} />
    }
  />
);

const mapStateToProps = state => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps)(PrivateRoute);
