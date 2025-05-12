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
import { UserProvider } from "./utils/userContext";

// Dashboard & Employee
import DashboardLayout from "./components/Dashboard/Dashboard-layout";
import AdminDashboard from "./Pages/adminDashboard";
import DashboardPackages from "./components/Dashboard/package";
import CityManagement from "./components/Dashboard/cities";
import SeasonManagement from "./components/Dashboard/seasons";
import HotelManagement from "./components/Dashboard/hotels";
import NewsletterManagement from "./components/Dashboard/newsletter";
import FAQManagement from "./components/Dashboard/faqsManagement";
import SocialMediaManagement from "./components/Dashboard/SocialMediaManagement";
import VisaApplicationsTable from "./components/Dashboard/VisaLead";
import ArticleForm from "./components/Dashboard/Articles/ArticleForm";
import ArticleDetails from "./components/Dashboard/Articles/ArticleDetails";
import ArticleList from "./components/Dashboard/Articles/ArticleList";
import CountryManagement from "./components/Dashboard/countries";

// Employee auth
import EmpLoginForm from "./components/Dashboard/loginFormEmp";
import EmpRegistrationForm from "./components/Dashboard/registerFormEmp";
import { EmpProvider } from "./utils/empContext";
import RequireEmployeeAuth from "./utils/RequireEmployeeAuth";
import BlogManager from "./components/Dashboard/BlogManagement";
import BannerDashboard from "./components/Dashboard/BannerManagement";
import CommentManagement from "./components/Dashboard/commentsManagment";
import TourCategoriesTable from "./components/Dashboard/tourCategories";
import ToursDashboard from "./components/Dashboard/tours";
import UsersTable from "./components/Dashboard/userManagement";
import ApplicationManager from "./components/Dashboard/applications";
import VisaDocumentsTable from "./components/Dashboard/visaDocuments";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<TravistaSignIn />} />
          <Route path="/signup" element={<TravistaSignUp />} />
          <Route path="/packages" element={<PackagesTours />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/loading" element={<TravistaLoading />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/applyforvisa" element={<ApplyForVisa />} />
          <Route path="/singleblog/:id" element={<SingleBLog />} />
          <Route path="/buildmypackage" element={<BuildMyPackage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/buildmypackagesteps"
            element={<BuildMyPackageSteps />}
          />
          <Route path="/blogs" element={<BlogsPage />} />
          {/* Employee Auth Routes */}
          <Route
            path="/employee/login"
            element={
              <EmpProvider>
                <EmpLoginForm />
              </EmpProvider>
            }
          />{" "}
          <Route
            path="/employee/register"
            element={
              <EmpProvider>
                <EmpRegistrationForm />
              </EmpProvider>
            }
          />
          {/* Employee Dashboard (Protected) */}
          <Route
            path="/dashboard/*"
            element={
              <EmpProvider>
                <RequireEmployeeAuth>
                  <DashboardLayout />
                </RequireEmployeeAuth>
              </EmpProvider>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="packages" element={<DashboardPackages />} />
            <Route path="countries" element={<CountryManagement />} />
            <Route path="BlogManagement" element={<BlogManager />} />
            <Route path="cities" element={<CityManagement />} />
            <Route path="seasons" element={<SeasonManagement />} />
            <Route path="hotels" element={<HotelManagement />} />
            <Route path="tour-categories" element={<TourCategoriesTable />} />
            <Route path="tours" element={<ToursDashboard />} />
            <Route path="newsletter" element={<NewsletterManagement />} />
            <Route path="applications" element={<ApplicationManager />} />
            <Route path="faqsmanagement" element={<FAQManagement />} />
            <Route path="DashboardHero" element={<TravistaLoading />} />
            <Route path="visaDocuments" element={<VisaDocumentsTable />} />
            <Route path="socialmedia" element={<SocialMediaManagement />} />
            <Route path="userManagement" element={<UsersTable />} />
            <Route path="visalead" element={<VisaApplicationsTable />} />
            <Route path="banners" element={<BannerDashboard />} />
            <Route path="CommentManagement" element={<CommentManagement />} />
            <Route path="articles" element={<ArticleList />} />
            <Route path="new" element={<ArticleForm />} />
            <Route path="edit/:id" element={<ArticleForm />} />
            <Route path=":id" element={<ArticleDetails />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
