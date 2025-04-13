import React from "react";
import { Navigate } from "react-router-dom";
import { useEmployee } from "./empContext";
import TravistaLoading from "../components/loading";

const RequireEmployeeAuth = ({ children }) => {
  const { employee, loading } = useEmployee();

  if (loading) {
    return <TravistaLoading />;
  }

  if (!employee) {
    return <Navigate to="/employee/login" replace />;
  }

  return children;
};

export default RequireEmployeeAuth;
