import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TravistaSignIn from "./components/login";

function App() {
  return (
    <Router>
      <Route exact path="/" component={TravistaSignIn} />
    </Router>
  );
}

export default App;
