import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests

function Highlight() {
  const [activeBanner, setActiveBanner] = useState(null); // State to store the active banner data
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch active banner data from the API
  useEffect(() => {
    const fetchActiveBanner = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/banners/active"
        );
        setActiveBanner(response.data); // Update state with the active banner data
      } catch (error) {
        console.error("Error fetching active banner:", error);
      }
    };

    fetchActiveBanner();
  }, []); // Run once when the component mounts

  // Handle package click navigation
  const handlePackageClick = () => {
    navigate("/packages"); // Navigate to Explore Packages page
  };

  // Check if activeBanner is loaded before rendering content
  if (!activeBanner) {
    return <Typography>Loading...</Typography>; // Loading state
  }

  return (
    <Box
      sx={{
        background: `url('http://localhost:5000${activeBanner.image}')`,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fallback color in case image fails to load
        backgroundBlendMode: "darken",
        height: "90vh",
        backgroundSize: "cover", // Ensures the background image covers the container
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat",
        padding: "2rem", // Adds padding inside the container
        boxSizing: "border-box", // Ensures padding is included in the total width/height
        position: "relative", // Enables absolute positioning for child elements
      }}
      className="highlight-section container-padding"
    >
      <Box
        className="Single-Blog-date-container"
        sx={{
          zIndex: 1,
          backgroundColor: "#ffffff",
          padding: "1rem",
          borderRadius: "8px",
          position: "absolute",
          top: "2rem",
          right: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="Single-Blog-month">
          {new Date(activeBanner.date)
            .toLocaleString("default", { month: "long" })
            .toUpperCase()}{" "}
          {/* Converts the month to uppercase */}
        </span>
        <span className="Single-Blog-day">
          {new Date(activeBanner.date).getDate()} {/* Get day as number */}
        </span>
        <span className="Single-Blog-year">
          {new Date(activeBanner.date).getFullYear()} {/* Get year as number */}
        </span>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          boxSizing: "border-box",
          paddingLeft: "30px",
          position: "relative", // Ensure that the content is properly positioned within the container
        }}
        className="highlight-container"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            color: "white",
            alignItems: "flex-start",
            width: "60%",
            textAlign: "left",
            zIndex: 2, // Brings the text content above other elements
          }}
          className="highlight-content"
        >
          <br></br>
          <Typography variant="h4" fontSize="7rem" fontWeight="900">
            {activeBanner.title} {/* Display banner title */}
          </Typography>
          <Typography variant="h5" fontWeight="700">
            {activeBanner.destinations} {/* Display banner destinations */}
          </Typography>
          <Typography variant="body1">
            {activeBanner.description} {/* Display banner description */}
          </Typography>
          <Box className="highlight-btns" display="flex" gap="2rem">
            <Button
              className="btn btn-secondary"
              sx={{ padding: "10px 80px !important" }}
              onClick={handlePackageClick}
            >
              Explore Trip
            </Button>
            <Button
              className="btn btn-primary"
              sx={{ padding: "10px 80px !important" }}
              onClick={handlePackageClick}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Highlight;
