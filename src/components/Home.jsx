import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Explore from "./Explore";
import Highlight from "./Highlight";
import About from "./About";
import PackageCard from "./PackageCard";
import Comments from "./Comments";
import FAQ from "./FAQ";
import Footer from "./Footer";

function home() {
  return (
    <div>
      <Hero />
      <Explore />
      <Highlight />
      <About />
      <PackageCard />
      <Comments />
      <FAQ />
    </div>
  );
}

export default home;
