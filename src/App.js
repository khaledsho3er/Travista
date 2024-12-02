import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PackagesTours from "./Pages/PackagesTours";
import CareerPage from "./components/careers";
import SinglePackage from "./components/singlePackage";
import TravistaLoading from "./components/loading";
import TravistaSignIn from "./Pages/login";
import TravistaSignUp from "./Pages/signup";
import PreferencePackage from "./components/preferencePackage";
import PersonalInfo from "./components/personalInfo";
import AccountPage from "./Pages/Account";
import FAQsPage from "./Pages/FAQs";
import ApplyForVisa from "./Pages/ApplyForVisa";
import SingleBLog from "./Pages/SingleBlog";
import BuildMyPackage from "./Pages/BuildMyPackage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={TravistaSignIn} />
        <Route exact path="/SignUp" Component={TravistaSignUp} />
        <Route exact path="/packages" Component={PackagesTours} />
        <Route exact path="/careers" Component={CareerPage} />
        <Route exact path="/singlePackage" Component={SinglePackage} />
        <Route exact path="/loading" Component={TravistaLoading} />
        <Route exact path="/pp" Component={PreferencePackage} />
        <Route exact path="/pi" Component={PersonalInfo} />
        <Route exact path="/account" Component={AccountPage} />
        <Route exact path="/faqs" Component={FAQsPage} />
        <Route exact path="/applyforvisa" Component={ApplyForVisa} />
        <Route exact path="/singleblog" Component={SingleBLog} />
        <Route exact path="/buildmypackage" Component={BuildMyPackage} />
      </Routes>
    </Router>
  );
}

export default App;
