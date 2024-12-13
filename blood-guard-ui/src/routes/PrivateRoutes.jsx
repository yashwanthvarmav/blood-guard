import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../setup/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
