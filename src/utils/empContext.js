// utils/empContext.js
import { createContext, useContext, useEffect, useState } from "react";

const EmpContext = createContext();

export const EmpProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedEmployee = localStorage.getItem("employee");
    const savedToken = localStorage.getItem("employee-token");
    if (savedEmployee && savedToken) {
      setEmployee(JSON.parse(savedEmployee));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (employee) {
      localStorage.setItem("employee", JSON.stringify(employee));
    } else {
      localStorage.removeItem("employee");
      localStorage.removeItem("employee-token");
    }
  }, [employee]);

  const login = async (credentials) => {
    try {
      const res = await fetch("https://api.travistasl.com/api/empauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        localStorage.setItem("employee-token", data.token);
      }

      if (data.employee) {
        setEmployee(data.employee);
      } else {
        throw new Error("Invalid response format");
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("employee-token");
    localStorage.removeItem("employee");
    setEmployee(null);
  };

  return (
    <EmpContext.Provider value={{ employee, login, logout, loading }}>
      {children}
    </EmpContext.Provider>
  );
};

export const useEmployee = () => useContext(EmpContext);
