import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQsSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function BuildMyPackage() {
  const navigate = useNavigate();

  const handleBMPSteps = () => {
    navigate("/buildmypackagesteps");
  };
  return (
    <Box className="build-my-package-page">
      <Navbar />
      <header className="build-my-package-header">
        <Box className="build-my-package-hero">
          <Box className="build-my-package-subtitle">
            <span>Build My Package</span>

            <h1>Your passport to tailored adventures</h1>
          </Box>
          <p>
            Build your package, own your adventure! Take the reins of travel
            customization and design a personalized escape for you senior trip,
            business travel, or for the sake of your wanderlust.
          </p>
          <button className="build-my-package-hero-btn" onClick={handleBMPSteps}>
            Build my Package
          </button>
        </Box>
        <img
          src="assets/buildMyPackage/buildmypackage.png"
          alt="buildMyPackageHero.png"
        />
        <img
          class="overlay-photo"
          src="assets/buildMyPackage/upsell-module.png"
          alt="Overlay pic"
        />
      </header>
      <Box className="Build-my-package-how-it-works">
        <h2>How it works?</h2>
        <Box className="Build-my-package-steps-container">
          <Box className="Build-my-package-step">
            <Box className="Build-my-package-step-number">1</Box>
            <h3>Start with your airport.</h3>
            <p>
              Choose your departure airports like your city’s airport, closest
              airport, and maybe even your parent’s.
            </p>
          </Box>
          <Box className="Build-my-package-step">
            <Box className="Build-my-package-step-number">2</Box>
            <h3>Choose your destination(s).</h3>
            <p>
              Choose the destinations that ignite your wanderlust and align with
              your travel aspirations.
            </p>
          </Box>
          <Box className="Build-my-package-step">
            <Box className="Build-my-package-step-number">3</Box>
            <h3>Get more personal.</h3>
            <p>
              Tell us more about yourself and your travel dreams, who’s
              travelling with you.
            </p>
          </Box>
        </Box>
      </Box>
      <FAQ />
      <Footer />
    </Box>
  );
}
export default BuildMyPackage;
