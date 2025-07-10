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
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "stretch",
          borderRadius: "1.25rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          height: "auto",
          overflow: "hidden",
        }}
        className="package-card"
      >
        <CardContent
          sx={{
            color: "var(--pink)",
            padding: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: { xs: "0.8rem", md: "1rem" },
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <Typography variant="body1" fontSize={{ xs: "1rem", md: "1.1rem" }}>
            Build Your Package
          </Typography>

          <Typography
            variant="h3"
            fontSize={{ xs: "1.5rem", sm: "2.2rem", md: "3.5rem" }}
            fontWeight="600"
          >
            Start crafting your adventure now, your Dream Trip is just a few
            clicks away.
          </Typography>

          <Typography variant="body1" fontSize={{ xs: "0.8rem", md: "1.1rem" }}>
            Fuel your travel dreams and bring your ultimate getaway to life.
            Whether you crave tropical beaches, cultural gems, or wild
            adventures , mix and match destinations, experiences, and stays to
            build your perfect escape. Start Crafting Your Trip
          </Typography>

          <CardActions sx={{ padding: 0, marginTop: { xs: "0.5rem", md: 0 } }}>
            <button
              className="btn"
              style={{
                color: "var(--dark-green)",
                background: "var(--pink)",
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "8px 24px",
              }}
              onClick={handleBuildPackageClick}
            >
              Build Your Package
            </button>
          </CardActions>
        </CardContent>

        <CardMedia
          sx={{ flex: 1, minHeight: { xs: 180, sm: 220, md: "auto" } }}
        >
          <img
            src="/assets/build-package-img.png"
            alt="Green Bowl Beach, Bali, Indonesia_2AGYRXP 1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </CardMedia>
      </Card>
    </Box>
  );
}

export default PackageCard;
