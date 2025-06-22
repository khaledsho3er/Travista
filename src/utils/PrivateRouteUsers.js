import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../utils/userContext";

const PrivateRouteUsers = ({ children }) => {
  const { userSession } = useUser();

  return userSession ? children : <Navigate to="/login" />;
};

export default PrivateRouteUsers;
