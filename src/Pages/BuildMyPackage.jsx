import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQsSection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet

function BuildMyPackage() {
  const navigate = useNavigate();

  const handleBMPSteps = () => {
    navigate("/buildmypackagesteps");
  };
  return (
    <Box className="build-my-package-page">
      <Helmet>
        <title>Build Your Travel Package | Travista Egypt</title>
        <meta
          name="description"
          content="Customize your dream trip with Travista’s Build My Package tool. Tailor every detail—from flights to destinations—for your next great adventure."
        />
        <meta
          name="keywords"
          content="Travista, build my package, custom travel package, travel planner, Egypt tours, senior trip, travel customization"
        />
        <meta
          property="og:title"
          content="Build My Travel Package | Travista Egypt"
        />
        <meta
          property="og:description"
          content="Design your perfect getaway with Travista. Customize your travel package based on your goals and preferences."
        />
        <meta
          property="og:image"
          content="https://travistaegypt.com/assets/buildMyPackage/buildmypackage.png"
        />
        <meta
          property="og:url"
          content="https://travistaegypt.com/buildmypackage"
        />
        <link rel="canonical" href="https://travistaegypt.com/buildmypackage" />
      </Helmet>
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
          <button
            className="build-my-package-hero-btn"
            onClick={handleBMPSteps}
          >
            Build my Package
          </button>
          <a
            href="https://travista.travel/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button className="build-my-package-hero-btn">
              Build by Operator
            </button>
          </a>
        </Box>
        <img
          src="assets/build_My_Package.jpg"
          alt="buildMyPackageHero.png"
          style={{ borderRadius: "2rem" }}
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
