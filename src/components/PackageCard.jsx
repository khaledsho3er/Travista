import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PackageCard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleBuildPackageClick = () => {
    navigate("/buildmypackage"); // Navigate to Build My Package page
  };
  return (
    <Box className="build-package-section">
      <Card
        sx={{
          background: "var(--dark-green)",
          display: "flex",
          justifyContent: "center",
          borderRadius: "1.25rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          height: "auto",
        }}
        className="package-card"
      >
        <CardContent
          sx={{
            color: "var(--pink)",
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1rem",
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="body1">Build Your Package</Typography>

          <Typography variant="h3" fontSize="3.5rem" fontWeight="600">
            Unleash your wanderlust and craft your dream trip
          </Typography>

          <Typography variant="body1">
            Plan your dream vacation with our customizable travel package.
            Choose from a variety of destinations, activities, and
            accommodations to create an experience that is perfect for you.
          </Typography>

          <CardActions>
            <button
              className="btn"
              style={{
                color: "var(--dark-green)",
                background: "var(--pink)",
                fontWeight: "bold",
              }}
              onClick={handleBuildPackageClick}
            >
              Build Your Package
            </button>
          </CardActions>
        </CardContent>

        <CardMedia sx={{ flex: 1 }}>
          <img
            src="/assets/build-package-img.png"
            alt="Green Bowl Beach, Bali, Indonesia_2AGYRXP 1"
            style={{ width: "100%", height: "100%" }}
          />
        </CardMedia>
      </Card>
    </Box>
  );
}

export default PackageCard;
