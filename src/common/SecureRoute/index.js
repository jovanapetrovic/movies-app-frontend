import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ component: Component, authenticated, ...restProps }) => (
  <Route
    {...restProps}
    render={props =>
      authenticated ? (
        <Component {...restProps} {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

export default SecureRoute;
