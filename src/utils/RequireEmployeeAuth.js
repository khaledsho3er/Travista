import React from "react";
import { Navigate } from "react-router-dom";
import { useEmployee } from "./empContext";

const RequireEmployeeAuth = ({ children }) => {
  const { employee } = useEmployee();

  if (!employee) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
};

export default RequireEmployeeAuth;
