import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Hero() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleExplorePackagesClick = () => {
    navigate("/packages"); // Navigate to Explore Packages page
  };

  const handleBuildPackageClick = () => {
    navigate("/buildmypackage"); // Navigate to Build My Package page
  };

  return (
    <>
      <div className="hero-section">
        <Box
          sx={{
            zIndex: 2,
            width: "90%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "700",
              textAlign: "center",
              fontSize: "5rem",
            }}
          >
            We exist to reveal a world <br /> of greater travel possibility.
          </Typography>

          <Box className="hero-btns">
            <Button className="btn btn-primary" onClick={handleExplorePackagesClick}>
              Explore Packages & Tours
            </Button>
            <Button className="btn btn-secondary" onClick={handleBuildPackageClick}>Build My Package</Button>
          </Box>
        </Box>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default Hero;
