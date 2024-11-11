import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravistaSignIn from "./components/login";
import Home from "./components/Home";
import PackagesTours from "./components/PackagesTours";
import CareerPage from "./components/careers";
import SinglePackage from "./components/singlePackage";
import TravistaSignUp from "./components/signup";
import TravistaLoading from './components/loading';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={TravistaSignIn} />
        <Route exact path="/SignUp" Component={TravistaSignUp} />
        <Route exact path="/packages" Component={PackagesTours} />
        <Route exact path="/careers" Component={CareerPage}/>
        <Route exact path="/singlePackage" Component={SinglePackage}/>
        <Route exact path="/loading" Component={TravistaLoading}/>

      </Routes>
    </Router>
  );
}

export default App;
