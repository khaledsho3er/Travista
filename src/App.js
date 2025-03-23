import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PackagesTours from "./Pages/PackagesTours";
import TravistaLoading from "./components/loading";
import TravistaSignIn from "./Pages/login";
import TravistaSignUp from "./Pages/signup";
import AccountPage from "./Pages/Account";
import FAQsPage from "./Pages/FAQs";
import ApplyForVisa from "./Pages/ApplyForVisa";
import SingleBLog from "./Pages/SingleBlog";
import BuildMyPackage from "./Pages/BuildMyPackage";
import AboutPage from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import BuildMyPackageSteps from "./Pages/BMPsteps";
import CareersPage from "./Pages/Careers";
import BlogsPage from "./Pages/Blogs";
import ScrollToTop from "./context/scrollToTop";
import DashboardLayout from "./components/Dashboard/Dashboard-layout";
import DashboardPackages from "./components/Dashboard/package";
import AdminDashboard from "./Pages/adminDashboard";
import { UserProvider } from "./utils/userContext";
import CityManagement from "./components/Dashboard/cities";
import SeasonManagement from "./components/Dashboard/seasons";
import HotelManagement from "./components/Dashboard/hotels";
import NewsletterManagement from "./components/Dashboard/newsletter";
import FAQManagement from "./components/Dashboard/faqsManagement";
import SocialMediaManagement from "./components/Dashboard/SocialMediaManagement";
import VisaApplicationsTable from "./components/Dashboard/VisaLead";
function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<TravistaSignIn />} />
            <Route path="/SignUp" element={<TravistaSignUp />} />
            <Route path="/packages" element={<PackagesTours />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/loading" element={<TravistaLoading />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/applyforvisa" element={<ApplyForVisa />} />
            <Route path="/singleblog" element={<SingleBLog />} />
            <Route path="/buildmypackage" element={<BuildMyPackage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route
              path="/buildmypackagesteps"
              element={<BuildMyPackageSteps />}
            />
            <Route path="/blogs" element={<BlogsPage />} />

            {/* Admin Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="packages" element={<DashboardPackages />} />
              <Route path="cities" element={<CityManagement />} />
              <Route path="seasons" element={<SeasonManagement />} />
              <Route path="hotels" element={<HotelManagement />} />
              <Route path="newsletter" element={<NewsletterManagement />} />
              <Route path="faqsmanagement" element={<FAQManagement />} />
              <Route path="socialmedia" element={<SocialMediaManagement />} />
              <Route path="visalead" element={<VisaApplicationsTable />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
