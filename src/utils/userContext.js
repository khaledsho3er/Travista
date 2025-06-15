import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("travista-user");
    if (savedUser) {
      setUserSession(JSON.parse(savedUser));
    }
  }, []);

  // Save to localStorage whenever session changes
  useEffect(() => {
    if (userSession) {
      localStorage.setItem("travista-user", JSON.stringify(userSession));
      localStorage.setItem("travista-token", userSession.token);
    } else {
      localStorage.removeItem("travista-user");
      localStorage.removeItem("travista-token");
    }
  }, [userSession]);
  // ✅ Logout function
  const logout = () => {
    setUserSession(null); // this also clears localStorage
  };
  return (
    <UserContext.Provider value={{ userSession, setUserSession, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
