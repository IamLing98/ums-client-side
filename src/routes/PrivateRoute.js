import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (isLogin ? <Component {...props} /> : <Redirect to="/authentication/login" />)}
    />
  );
};

export default PrivateRoute;
