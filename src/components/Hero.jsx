import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Hero({ preloadedData = null }) {
  const [heroData, setHeroData] = useState(preloadedData);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if data wasn't provided from parent
    if (!preloadedData) {
      const fetchHero = async () => {
        try {
          const res = await axios.get(
            "https://api.travistasl.com/api/hero/active"
          );
          setHeroData(res.data);
        } catch (err) {
          console.error("Failed to fetch hero data", err);
        }
      };

      fetchHero();
    }
  }, [preloadedData]);

  if (!heroData) return null;

  return (
    <div
      style={{
        height: "90vh",
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://api.travistasl.com${heroData.imageUrl})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
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
            fontSize: { xs: "2.5rem", md: "5rem" },
          }}
        >
          {heroData.caption.split(".").map((segment, index) => (
            <span key={index}>
              {segment.trim()}
              {index < heroData.caption.split(".").length - 1 ? "." : ""}
              <br />
            </span>
          ))}
        </Typography>

        <Box className="hero-btns">
          <Button
            className="btn btn-primary"
            onClick={() => navigate("/packages")}
          >
            Explore Packages & Tours
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => navigate("/buildmypackage")}
          >
            Build My Package
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Hero;
