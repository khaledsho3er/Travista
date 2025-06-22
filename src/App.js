import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TravistaLoading from "./components/loading";
import ScrollToTop from "./context/scrollToTop";
import { UserProvider } from "./utils/userContext";
import { initScrollbarVisibility } from "./utils/scrollbarVisibility";
import { EmpProvider } from "./utils/empContext";
import RequireEmployeeAuth from "./utils/RequireEmployeeAuth";
import PrivateRouteUsers from "./utils/PrivateRouteUsers";

// Lazy load all pages
const Home = lazy(() => import("./Pages/Home"));
const PackagesTours = lazy(() => import("./Pages/PackagesTours"));
const TravistaSignIn = lazy(() => import("./Pages/login"));
const TravistaSignUp = lazy(() => import("./Pages/signup"));
const AccountPage = lazy(() => import("./Pages/Account"));
const FAQsPage = lazy(() => import("./Pages/FAQs"));
const ApplyForVisa = lazy(() => import("./Pages/ApplyForVisa"));
const SingleBLog = lazy(() => import("./Pages/SingleBlog"));
const BuildMyPackage = lazy(() => import("./Pages/BuildMyPackage"));
const AboutPage = lazy(() => import("./Pages/About"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const BuildMyPackageSteps = lazy(() => import("./Pages/BMPsteps"));
const CareersPage = lazy(() => import("./Pages/Careers"));
const BlogsPage = lazy(() => import("./Pages/Blogs"));
const NotFound = lazy(() => import("./Pages/NotFound"));

// Dashboard & Employee Pages
const DashboardLayout = lazy(() =>
  import("./components/Dashboard/Dashboard-layout")
);
const AdminDashboard = lazy(() => import("./Pages/adminDashboard"));
const DashboardPackages = lazy(() => import("./components/Dashboard/package"));
const CityManagement = lazy(() => import("./components/Dashboard/cities"));
const SeasonManagement = lazy(() => import("./components/Dashboard/seasons"));
const HotelManagement = lazy(() => import("./components/Dashboard/hotels"));
const NewsletterManagement = lazy(() =>
  import("./components/Dashboard/newsletter")
);
const FAQManagement = lazy(() =>
  import("./components/Dashboard/faqsManagement")
);
const SocialMediaManagement = lazy(() =>
  import("./components/Dashboard/SocialMediaManagement")
);
const VisaApplicationsTable = lazy(() =>
  import("./components/Dashboard/VisaLead")
);
const ArticleForm = lazy(() =>
  import("./components/Dashboard/Articles/ArticleForm")
);
const ArticleDetails = lazy(() =>
  import("./components/Dashboard/Articles/ArticleDetails")
);
const ArticleList = lazy(() =>
  import("./components/Dashboard/Articles/ArticleList")
);
const CountryManagement = lazy(() =>
  import("./components/Dashboard/countries")
);
const BlogManager = lazy(() => import("./components/Dashboard/BlogManagement"));
const BannerDashboard = lazy(() =>
  import("./components/Dashboard/BannerManagement")
);
const CommentManagement = lazy(() =>
  import("./components/Dashboard/commentsManagment")
);
const TourCategoriesTable = lazy(() =>
  import("./components/Dashboard/tourCategories")
);
const ToursDashboard = lazy(() => import("./components/Dashboard/tours"));
const UsersTable = lazy(() => import("./components/Dashboard/userManagement"));
const ApplicationManager = lazy(() =>
  import("./components/Dashboard/applications")
);
const VisaDocumentsTable = lazy(() =>
  import("./components/Dashboard/visaDocuments")
);

// Employee Auth
const EmpLoginForm = lazy(() => import("./components/Dashboard/loginFormEmp"));
const EmpRegistrationForm = lazy(() =>
  import("./components/Dashboard/registerFormEmp")
);

function App() {
  useEffect(() => {
    initScrollbarVisibility();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <Suspense fallback={<TravistaLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<TravistaSignIn />} />
            <Route path="/signup" element={<TravistaSignUp />} />
            <Route path="/packages" element={<PackagesTours />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/loading" element={<TravistaLoading />} />
            <Route
              path="/account"
              element={
                <PrivateRouteUsers>
                  <AccountPage />
                </PrivateRouteUsers>
              }
            />
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
            <Route
              path="/employee/login"
              element={
                <EmpProvider>
                  <EmpLoginForm />
                </EmpProvider>
              }
            />
            <Route
              path="/employee/register"
              element={
                <EmpProvider>
                  <EmpRegistrationForm />
                </EmpProvider>
              }
            />
            <Route
              path="/admin/*"
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
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </Router>
  );
}

export default App;
