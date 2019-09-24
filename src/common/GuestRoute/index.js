import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ component: Component, authenticated, ...restProps }) => (
  <Route
    {...restProps}
    render={props =>
      !authenticated ? (
        <Component {...restProps} {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default GuestRoute;
