import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loading, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => !isAuthenticated && !loading ? (
        <Redirect to='/' />
      ) : (
          <Component {...props} />
        )}
    />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoute);
