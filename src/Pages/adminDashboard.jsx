import React from "react";
import Dashboard from "./Dashboard";
// import Sidebar from "../components/Dashboard/sidebar";
import { Toaster } from "react-hot-toast";
import { useEmployee } from "../utils/empContext"; // Import EmployeeContext
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { employee } = useEmployee();
  if (!employee) {
    return <Navigate to="/employee/login" />;
  }
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <Dashboard session={employee} />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminDashboard;
