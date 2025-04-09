import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import InputIcon from "@mui/icons-material/Input";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useEmployee } from "../utils/empContext"; // Import EmployeeContext

function StatCard({ icon: Icon, title, value, trend }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUpIcon
            className={`h-4 w-4 ${trend >= 0 ? "" : "rotate-180"}`}
          />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
    </div>
  );
}

function RecentActivity({ title, items }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CalendarTodayIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const { employee } = useEmployee();

  const stats = [
    { icon: InventoryIcon, title: "Total Packages", value: "124", trend: 12 },
    { icon: PeopleIcon, title: "Active Customers", value: "832", trend: 8 },
    { icon: DescriptionIcon, title: "Blog Posts", value: "48", trend: -3 },
    { icon: InputIcon, title: "New Forms", value: "29", trend: 24 },
  ];

  const recentBookings = [
    { title: "Paris Adventure Package Booked", time: "2 hours ago" },
    { title: "Tokyo Explorer Package Booked", time: "4 hours ago" },
    { title: "Safari Experience Reserved", time: "6 hours ago" },
    { title: "Beach Resort Package Booked", time: "8 hours ago" },
  ];

  const recentForms = [
    { title: "Custom Tour Request Submitted", time: "1 hour ago" },
    { title: "Group Travel Inquiry", time: "3 hours ago" },
    { title: "Package Modification Request", time: "5 hours ago" },
    { title: "Travel Insurance Form", time: "7 hours ago" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome {employee.name}
        </h1>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to Travista Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity title="Recent Bookings" items={recentBookings} />
        <RecentActivity title="Recent Forms" items={recentForms} />
      </div>
    </div>
  );
}

export default Dashboard;
