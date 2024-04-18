import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravistaSignIn from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" Component={TravistaSignIn} />
      </Routes>
    </Router>
  );
}

export default App;
