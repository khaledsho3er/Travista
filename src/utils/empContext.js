// utils/empContext.js
import { createContext, useContext, useEffect, useState } from "react";

const EmpContext = createContext();

export const EmpProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load employee and token from localStorage
  useEffect(() => {
    const savedEmployee = localStorage.getItem("employee");
    const savedToken = localStorage.getItem("employee-token");
    if (savedEmployee && savedToken) {
      setEmployee(JSON.parse(savedEmployee));
    }
  }, []);

  // Check token and validate session
  useEffect(() => {
    const token = localStorage.getItem("employee-token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://api.travistasl.com/api/empauth/session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.employee) setEmployee(data.employee);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Sync employee state to localStorage
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
