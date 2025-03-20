import React, { useState } from "react";
import {
  Home,
  Package,
  FileText,
  Users,
  FormInput,
  Bell,
  Plane,
} from "lucide-react";
import { PiCity } from "react-icons/pi";

function Sidebar({ setActiveSection }) {
  const menuItems = [
//     { path: "/Dashboard", icon: Home, label: "Dashboard" },
//     { path: "/dashboard-packages", icon: Package, label: "Packages" },
//     { path: "/dashboard-blogs", icon: FileText, label: "Blogs" },
//     { path: "/dashboard-employees", icon: Users, label: "Employees" },
//     { path: "/dashboard-forms", icon: FormInput, label: "Forms" },
//     { path: "/dashboard-notifications", icon: Bell, label: "Notifications" },
//     { path: "/dashboard-cities", icon: PiCity, label: "cities" },
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "packages", icon: Package, label: "Packages" },
    { id: "blogs", icon: FileText, label: "Blogs" },
    { id: "employees", icon: Users, label: "Employees" },
    { id: "forms", icon: FormInput, label: "Forms" },
    { id: "notifications", icon: Bell, label: "Notifications" },
  {id:"cities", icon:PiCity, label:"cities"},
  ];

  const [activeSection, setActive] = useState("dashboard");

  const handleClick = (id) => {
    setActive(id);
    setActiveSection(id); // Pass the selected section to parent
  };

  return (
    <div className="bg-white h-screen shadow-lg w-64">
      <div className="border-b p-4">
        <div className="flex gap-2 items-center">
          <Plane className="h-8 text-blue-600 w-8" />
          <h1 className="text-2xl text-blue-600 font-bold">Travista</h1>
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
      </nav>
    </div>
  );
}

export default Sidebar;
