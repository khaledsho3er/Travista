import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Explore from "./Explore";
import Highlight from "./Highlight";
import About from "./About";

function home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Explore />
      <Highlight />
      <About />
    </div>
  );
}

export default home;
