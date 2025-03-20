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

function Sidebar({ setActiveSection }) {
  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "packages", icon: Package, label: "Packages" },
    { id: "blogs", icon: FileText, label: "Blogs" },
    { id: "employees", icon: Users, label: "Employees" },
    { id: "forms", icon: FormInput, label: "Forms" },
    { id: "notifications", icon: Bell, label: "Notifications" },
  ];

  const [activeSection, setActive] = useState("dashboard");

  const handleClick = (id) => {
    setActive(id);
    setActiveSection(id); // Pass the selected section to parent
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Plane className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Travista</h1>
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
