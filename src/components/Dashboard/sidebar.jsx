import React, { useState } from "react";
import { Home, Package, Users, FormInput, Bell, LogOut } from "lucide-react";
import { PiCity } from "react-icons/pi";
import { LuHotel } from "react-icons/lu";
import { ImNewspaper } from "react-icons/im";
import { BsQuestionOctagon, BsFilePost } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { useEmployee } from "../../utils/empContext"; // Import EmployeeContext
function Sidebar({ setActiveSection }) {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "packages", icon: Package, label: "Packages" },
    { id: "articles", icon: GrArticle, label: "Articles" },
    { id: "BlogManagement", icon: BsFilePost, label: "Blog Management" },
    { id: "forms", icon: FormInput, label: "Forms" },
    { id: "Visa", icon: FaWpforms, label: "Visa" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "countries", icon: PiCity, label: "Countries" },
    { id: "cities", icon: PiCity, label: "cities" },
    { id: "seasons", icon: AcUnitIcon, label: "Seasons" },
    { id: "hotels", icon: LuHotel, label: "Hotels" },
    { id: "employees", icon: Users, label: "Employees" },
    { id: "newsletter", icon: ImNewspaper, label: "Newsletters" },
    { id: "FaqsManagement", icon: BsQuestionOctagon, label: "FAQs Management" },
    { id: "dashboardHero", icon: FaRegImage, label: "Hero Section" },
    { id: "banners", icon: ViewCarouselIcon, label: "Banner Management" },
    { id: "SocialMedia", icon: IoShareSocialOutline, label: "Social Media" },
  ];
  const { logout } = useEmployee(); // Get employee data from context
  const [activeSection, setActive] = useState("dashboard");

  const handleClick = (id) => {
    setActive(id);
    setActiveSection(id); // Pass the selected section to parent
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="bg-white h-screen-auto shadow-lg w-64">
      <div className="border-b p-4">
        <div className="flex gap-2 items-center">
          {/* <Plane className="h-8 text-blue-600 w-8" /> */}
          <h1 className="text-2xl text-blue-300 font-bold center">
            <img src="Assets/main-logo.png" alt="logo" />
          </h1>
        </div>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center w-full text-left gap-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left gap-3 p-3 rounded-lg mb-2 transition-colors text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
