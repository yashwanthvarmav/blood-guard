import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, profileDate } = useAuth();
  return isAuthenticated &&
    ["ADMIN", "DONOR", "ORG-ADMIN"].includes(profileDate?.user?.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
