import React, { useState } from "react";
import {
  Home,
  Package,
  Users,
  FormInput,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  Settings,
} from "lucide-react";
import { PiCity } from "react-icons/pi";
import { LuHotel } from "react-icons/lu";
import { ImNewspaper } from "react-icons/im";
import { BsQuestionOctagon, BsFilePost } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa6";
// import { GrArticle } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { MdOutlineTour, MdOutlineTravelExplore } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { CiSquareQuestion } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { RiArticleLine } from "react-icons/ri";

import { useEmployee } from "../../utils/empContext"; // Import EmployeeContext
function Sidebar({ setActiveSection }) {
  // Define menu categories
  const menuCategories = [
    {
      id: "main",
      label: "Main",
      icon: Home,
      items: [
        { id: "dashboard", icon: Home, label: "Dashboard" },
        { id: "packages", icon: Package, label: "Packages" },
        { id: "odooPackages", icon: Package, label: "Odoo Packages" },
        { id: "applications", icon: Users, label: "Applications" },
        {
          id: "BMPApplications",
          icon: CiSquareQuestion,
          label: "Build My Package",
        },
        { id: "notifications", icon: Bell, label: "Notifications" },
      ],
    },
    {
      id: "content",
      label: "Content Management",
      icon: RiArticleLine,
      items: [
        // { id: "articles", icon: GrArticle, label: "Articles" },
        { id: "BlogManagement", icon: BsFilePost, label: "Blog Management" },
        { id: "banners", icon: ViewCarouselIcon, label: "Banner Management" },
        { id: "dashboardHero", icon: FaRegImage, label: "Hero Section" },
        { id: "CommentManagement", icon: AddCommentIcon, label: "Reviews" },
      ],
    },
    {
      id: "destinations",
      label: "Destinations",
      icon: BiWorld,
      items: [
        { id: "countries", icon: PiCity, label: "Countries" },
        { id: "cities", icon: PiCity, label: "Cities" },
        { id: "seasons", icon: AcUnitIcon, label: "Seasons" },
        { id: "hotels", icon: LuHotel, label: "Hotels" },
        {
          id: "tour-categories",
          icon: TbCategoryPlus,
          label: "Tour Categories",
        },
        { id: "tours", icon: MdOutlineTour, label: "Tours" },
      ],
    },
    {
      id: "visa",
      label: "Visa Services",
      icon: FaWpforms,
      items: [
        { id: "Visa", icon: FaWpforms, label: "Visa" },
        {
          id: "visaDocuments",
          icon: MdOutlineTravelExplore,
          label: "Visa Management",
        },
        { id: "forms", icon: FormInput, label: "Forms" },
      ],
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      items: [
        { id: "employees", icon: Users, label: "Employees" },
        { id: "userManagement", icon: Users, label: "User Management" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      items: [
        { id: "newsletter", icon: ImNewspaper, label: "Newsletters" },
        {
          id: "FaqsManagement",
          icon: BsQuestionOctagon,
          label: "FAQs Management",
        },
        {
          id: "SocialMedia",
          icon: IoShareSocialOutline,
          label: "Social Media",
        },
      ],
    },
  ];

  const { logout } = useEmployee(); // Get employee data from context
  const [activeSection, setActive] = useState("dashboard");
  const [expandedCategories, setExpandedCategories] = useState(["main"]);

  const handleClick = (id) => {
    setActive(id);
    setActiveSection(id); // Pass the selected section to parent
  };

  const toggleCategory = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      // If clicking on an already open category, close it
      setExpandedCategories((prev) => prev.filter((id) => id !== categoryId));
    } else {
      // If opening a new category, close all others and open only this one
      setExpandedCategories([categoryId]);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white h-screen overflow-y-auto shadow-lg w-64">
      <div className="border-b p-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl text-blue-300 font-bold center">
            <img src="assets/main-logo.png" alt="logo" />
          </h1>
        </div>
      </div>
      <nav className="p-4">
        {menuCategories.map((category) => {
          const CategoryIcon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <div key={category.id} className="mb-2">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center w-full text-left gap-3 p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
              >
                <CategoryIcon className="h-5 w-5" />
                <span className="font-medium">{category.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                ) : (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-3 pl-3 border-l border-gray-200 mt-1 mb-2 bg-gray-50 rounded-lg py-2 px-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`flex items-center w-full text-left gap-3 p-2 rounded-lg mb-1 transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left gap-3 p-3 rounded-lg mb-2 mt-4 transition-colors text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
