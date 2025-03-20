import React from "react";
import { Link, useLocation } from "react-router-dom";
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

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/Dashboard", icon: Home, label: "Dashboard" },
    { path: "/dashboard-packages", icon: Package, label: "Packages" },
    { path: "/dashboard-blogs", icon: FileText, label: "Blogs" },
    { path: "/dashboard-employees", icon: Users, label: "Employees" },
    { path: "/dashboard-forms", icon: FormInput, label: "Forms" },
    { path: "/dashboard-notifications", icon: Bell, label: "Notifications" },
    { path: "/dashboard-cities", icon: PiCity, label: "cities" },
  ];

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
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
