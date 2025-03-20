import React, { useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "../../Pages/Dashboard";
import DashboardPackages from "./package";
import BlogsForm from "./blogs";
import Employees from "./employees";
import Forms from "./forms";
import NotificationsTable from "./Notifications";
import CityManagement from "./cities";

function DashboardLayout() {
  const [activeSection, setActiveSection] = useState("dashboard"); // Use lowercase

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "packages":
        return <DashboardPackages />;
      case "blogs":
        return <BlogsForm />;
      case "employees":
        return <Employees />;
      case "forms":
        return <Forms />;
      case "notifications":
        return <NotificationsTable />;
      case "cities":
        return <CityManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
}

export default DashboardLayout;
