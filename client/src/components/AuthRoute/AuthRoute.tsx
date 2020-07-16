import React, { ReactNode } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux";

interface AuthRouteProps extends RouteProps {
  children: ReactNode;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children, ...rest }) => {
  const authenticated = useSelector<RootState, boolean>(
    (state) => state.auth.authenticated
  );

  return (
    <>
      {authenticated ? (
        <Redirect to="/" />
      ) : (
        <Route {...rest}>{children}</Route>
      )}
    </>
  );
};
