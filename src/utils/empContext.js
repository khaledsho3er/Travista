import { createContext, useContext, useEffect, useState } from "react";

const EmpContext = createContext();

export const EmpProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/empauth/session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.employee) setEmployee(data.employee);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await fetch("http://localhost:5000/api/empauth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log("Login response:", data); // Debugging log
    if (res.ok) {
      setEmployee(data.employee);
      // Check session after successful login
      fetch("http://localhost:5000/api/empauth/session", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((sessionData) => {
          console.log("Session data after login:", sessionData); // Debugging log
        });
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/empauth/logout", {
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
