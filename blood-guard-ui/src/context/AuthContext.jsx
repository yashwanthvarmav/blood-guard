import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AuthContext = (props) => {
  const isLogged = localStorage.getItem("authToken");
  const profileData = localStorage.getItem("user");

  const [profileDate, setProfileDate] = useState(
    profileData ? JSON.parse(profileData) : {}
  );

  useEffect(() => {
    const profileDataa = localStorage.getItem("user");
    console.log("nn->", profileDataa);
    setProfileDate(profileDataa ? JSON.parse(profileDataa) : {});
  }, [profileData]);

  console.log("inside Date", profileData, profileDate);

  const [isAuthenticated, setIsAuthenticated] = useState(!!isLogged);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        profileDate: profileDate,
      }}
    >
      {props?.children}
    </AppContext.Provider>
  );
};

// export default AuthContext;

export const useAuth = () => useContext(AppContext);
