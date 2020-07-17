import React, { ReactNode } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux";

interface ProtectedRouteProps extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  ...rest
}: {
  children: ReactNode;
}) => {
  const authenticated = useSelector<RootState, boolean>(
    (state) => state.auth.authenticated
  );

  return (
    <>
      {authenticated ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
