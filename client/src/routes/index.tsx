import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthRoute } from "../components/AuthRoute";
import { Login } from "./Login";
import { Register } from "./Register";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <AuthRoute exact path="/login">
        <Login />
      </AuthRoute>
      <AuthRoute exact path="/register">
        <Register />
      </AuthRoute>
    </Switch>
  </BrowserRouter>
);
