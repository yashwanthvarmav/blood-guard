import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, profileDate } = useAuth();

  return isAuthenticated &&
    ["ADMIN", "DONOR", "ORG-ADMIN","ORGANIZATION"].includes(profileDate?.user?.role || profileDate?.admin?.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
