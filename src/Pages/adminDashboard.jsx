import React from "react";
import Dashboard from "./Dashboard";
import Sidebar from "../components/Dashboard/sidebar";
import { Toaster } from "react-hot-toast";
const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Dashboard />
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminDashboard;
