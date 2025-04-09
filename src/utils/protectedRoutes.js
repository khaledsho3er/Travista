import { Navigate } from "react-router-dom";
import { useEmployee } from "../context/EmpContext";

const ProtectedRoute = ({ children }) => {
  const { employee, loading } = useEmployee();

  if (loading) return <div>Loading...</div>;
  if (!employee) return <Navigate to="/employee/login" />;

  return children;
};

export default ProtectedRoute;
