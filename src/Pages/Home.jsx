import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Explore from "../components/Explore";
import Highlight from "../components/Highlight";
import About from "../components/About";
import PackageCard from "../components/PackageCard";
import Comments from "../components/Comments";
import FAQ from "../components/FAQsSection";
import Footer from "../components/Footer";
function home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Explore />
      <Highlight />
      <About />
      <PackageCard />
      <Comments />
      <FAQ />
      <Footer />
    </div>
  );
}

export default home;
