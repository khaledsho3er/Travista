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
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Session check status:", res.status);
        if (!res.ok) {
          console.error("Session check failed:", res.status);
          localStorage.removeItem("employee"); // Clear local storage on session failure
          setEmployee(null);
          setLoading(false);
          return { employee: null };
        }
        return res.json();
      })
      .then((data) => {
        console.log("Session data:", data);
        if (data.employee) {
          setEmployee(data.employee);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Session check error:", error);
        setLoading(false);
      });
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the employee data in state
      if (data.employee) {
        setEmployee(data.employee);

        // Verify session immediately after login
        const sessionCheck = await fetch(
          "https://158.220.96.121/api/empauth/session",
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Session check after login:", sessionCheck.status);

        if (!sessionCheck.ok) {
          console.error("Session verification failed after login");
        }
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
