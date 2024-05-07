import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravistaSignIn from "./components/login";
import Home from "./components/Home";
import PackagesTours from "./components/PackagesTours";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={TravistaSignIn} />
        <Route exact path="/packages" Component={PackagesTours} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
