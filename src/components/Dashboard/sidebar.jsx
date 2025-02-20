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

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/Dashboard", icon: Home, label: "Dashboard" },
    { path: "/packages", icon: Package, label: "Packages" },
    { path: "/blogs", icon: FileText, label: "Blogs" },
    { path: "/employees", icon: Users, label: "Employees" },
    { path: "/forms", icon: FormInput, label: "Forms" },
    { path: "/notifications", icon: Bell, label: "Notifications" },
  ];

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
