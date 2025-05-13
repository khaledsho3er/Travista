import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaCompass } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box className="not-found-page">
      <Navbar />
      <Box 
        className="not-found-content"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "2rem", md: "4rem" },
          minHeight: "70vh",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box 
          sx={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            marginRight: { xs: 0, md: "2rem" },
            marginBottom: { xs: "2rem", md: 0 }
          }}
        >
          <FaCompass size={120} color="#750046" className="compass-icon" />
          <style>
            {`.compass-icon {
                animation: pulse 2s infinite ease-in-out;
              }
              @keyframes pulse {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.1) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
              }`}
          </style>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: "5rem", md: "8rem" },
              fontWeight: "bold",
              color: "#142328",
              marginTop: "1rem"
            }}
          >
            404
          </Typography>
        </Box>
        
        <Box sx={{ flex: 1, maxWidth: "600px" }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: "bold", 
              marginBottom: "1rem",
              color: "#142328"
            }}
          >
            Destination Not Found
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              marginBottom: "2rem",
              color: "#555"
            }}
          >
            Looks like you've ventured off the map! This destination isn't in our travel catalog.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<FaMapMarkerAlt />}
              onClick={handleGoHome}
              sx={{
                backgroundColor: "#750046",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#5c0036",
                },
              }}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/packages")}
              sx={{
                borderColor: "#142328",
                color: "#142328",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "#0a1114",
                  backgroundColor: "rgba(20, 35, 40, 0.04)",
                },
              }}
            >
              Explore Packages
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default NotFound;