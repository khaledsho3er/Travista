import React from "react";
import { Box, Typography, Button } from "@mui/material";
import About from "../components/About";
import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import Timeline from "../components/AboutTimeline";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <div>
      <Navbar />
      <div>
        <AboutHero />
      </div>
      <Timeline />
      <Footer />
    </div>
  );
}

export default AboutPage;
