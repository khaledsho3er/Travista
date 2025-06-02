import React, { useEffect, useState } from "react";
import axios from "axios";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import InputIcon from "@mui/icons-material/Input";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useEmployee } from "../utils/empContext";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://158.220.96.121/api/dashboard/overview")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to load dashboard data:", err));
  }, []);

  if (!data) {
    return (
      <div className="p-8 text-gray-500 text-lg">Loading dashboard...</div>
    );
  }

  const stats = [
    {
      icon: InventoryIcon,
      title: "Total Packages",
      value: data.totalPackages,
      trend: 5,
    },
    {
      icon: PeopleIcon,
      title: "Active Customers",
      value: data.activeCustomers,
      trend: 6,
    },
    {
      icon: DescriptionIcon,
      title: "Blog Posts",
      value: data.blogPosts,
      trend: 0,
    },
    {
      icon: InputIcon,
      title: "New Forms",
      value: data.newForms,
      trend: 10,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome {employee?.name || "Admin"}
        </h1>
        <p className="text-gray-500">Dashboard Overview for Travista</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentActivity title="Recent Bookings" items={data.recentBookings} />
        <RecentActivity title="Recent Forms" items={data.recentForms} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Most Booked Package
        </h2>
        {data.mostBookedPackage ? (
          <p className="text-gray-700">
            {data.mostBookedPackage.name} —{" "}
            <span className="font-medium text-blue-600">
              {data.mostBookedPackage.bookings} bookings
            </span>
          </p>
        ) : (
          <p className="text-gray-500">No booking data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
