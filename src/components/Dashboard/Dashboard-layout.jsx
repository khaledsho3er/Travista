import React, { useState } from "react";
import Sidebar from "./sidebar";
import Dashboard from "../../Pages/Dashboard";
import DashboardPackages from "./package";
import BlogsForm from "./blogs";
import Employees from "./employees";
import Forms from "./forms";
import NotificationsTable from "./Notifications";
import CityManagement from "./cities";
import SeasonManagement from "./seasons";
import HotelManagement from "./hotels";
import NewsletterManagement from "./newsletter";
import FAQManagement from "./faqsManagement";
import SocialMediaManagement from "./SocialMediaManagement";
import VisaApplicationsTable from "./VisaLead";
import ArticleList from "./Articles/ArticleList";
// import BlogEditor from "./blogEditor";
import { Outlet } from "react-router-dom"; // Outlet for rendering pages
import CountryManagement from "./countries";

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
      case "Visa":
        return <VisaApplicationsTable />;
      case "notifications":
        return <NotificationsTable />;
      case "countries":
        return <CountryManagement />;
      case "cities":
        return <CityManagement />;
      case "seasons":
        return <SeasonManagement />;
      case "hotels":
        return <HotelManagement />;
      case "newsletter":
        return <NewsletterManagement />;
      case "FaqsManagement":
        return <FAQManagement />;
      case "SocialMedia":
        return <SocialMediaManagement />;
      case "articles":
        return <ArticleList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-6">
        {renderSection()}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}

export default DashboardLayout;
