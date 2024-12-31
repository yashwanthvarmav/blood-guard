import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ACCOUNT_ROLES } from "../utilities/constants";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, profileDate } = useAuth();
  console.log("Profile->", profileDate);
  const link =
    isAuthenticated && profileDate?.user?.role === "DONOR"
      ? ACCOUNT_ROLES?.DONOR
      : profileDate?.user?.role === "ORGANIZATION"
      ? ACCOUNT_ROLES?.ORGANIZATION
      : ACCOUNT_ROLES?.ADMIN;
  const [navigateLink, setNavigateLink] = useState(link);
  console.log("isAuthenticatd->", isAuthenticated, navigateLink);
  useEffect(() => {
    setNavigateLink(ACCOUNT_ROLES[profileDate?.user?.role]);
  }, [profileDate]);

  return isAuthenticated ? <Navigate to={navigateLink} /> : children;
};

export default PublicRoute;
