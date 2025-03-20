import React, { createContext, useState, useEffect, useContext } from "react";

// Create Context
export const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(() => {
    // Retrieve session from localStorage if it exists
    const savedSession = localStorage.getItem("userSession");
    return savedSession ? JSON.parse(savedSession) : null;
  });

  // Whenever userSession changes, save it to localStorage
  useEffect(() => {
    if (userSession) {
      localStorage.setItem("userSession", JSON.stringify(userSession));
    } else {
      localStorage.removeItem("userSession");
    }
  }, [userSession]);

  // Logout function (clear session)
  const logout = () => {
    setUserSession(null);
    localStorage.removeItem("userSession");
  };

  return (
    <UserContext.Provider value={{ userSession, setUserSession, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using UserContext
export const useUser = () => {
  return useContext(UserContext);
};
