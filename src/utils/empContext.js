import { createContext, useContext, useEffect, useState } from "react";

const EmpContext = createContext();

export const EmpProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Try loading from localStorage on mount (optional, improves perceived speed)
  useEffect(() => {
    const savedEmployee = localStorage.getItem("employee");
    if (savedEmployee) {
      setEmployee(JSON.parse(savedEmployee));
    }
  }, []);

  // 2️⃣ Check actual session on server
  useEffect(() => {
    fetch("https://158.220.96.121/api/empauth/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.employee) setEmployee(data.employee);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 3️⃣ Sync employee state to localStorage
  useEffect(() => {
    if (employee) {
      localStorage.setItem("employee", JSON.stringify(employee));
    } else {
      localStorage.removeItem("employee");
    }
  }, [employee]);

  const login = async (credentials) => {
    try {
      const res = await fetch("https://158.220.96.121/api/empauth/login", {
        method: "POST",
        credentials: "include", // Important: This sends cookies with the request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the employee data in state
      if (data.employee) {
        setEmployee(data.employee);
      } else {
        console.error("No employee data in response:", data);
        throw new Error("Invalid response format");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await fetch("https://158.220.96.121/api/empauth/logout", {
      method: "POST",
      credentials: "include",
    });
    setEmployee(null);
  };

  return (
    <EmpContext.Provider value={{ employee, login, logout, loading }}>
      {children}
    </EmpContext.Provider>
  );
};

export const useEmployee = () => useContext(EmpContext);
