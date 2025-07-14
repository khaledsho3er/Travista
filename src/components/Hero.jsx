import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScrambleText from "../animations/scrambletest"; // Add this import at the top
import { motion } from "framer-motion";

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
        height: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://api.travistasl.com${heroData.imageUrl})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden", // Prevents arrow/gradient overflow
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
            fontSize: {
              xs: "1.4rem", // <600px
              sm: "2.5rem", // 600px - 899px
              md: "4rem", // 900px - 1079px
              lg: "5rem", // >=1080px
            },
            // Custom media query for 900-1080px if you want more precision:
            "@media (min-width:900px) and (max-width:1080px)": {
              fontSize: "4rem",
            },
            "@media (min-width:1081px)": {
              fontSize: "5rem",
            },
            "@media (max-height:580px)": {
              marginTop: "20px",
              fontSize: "4rem",
              marginBottom: "-60px",
            },
            "@media (max-height:580px) and (max-width:1024px)": {
              marginTop: "20px",
              fontSize: "3rem",
              marginBottom: "-60px",
            },
          }}
        >
          {heroData.caption.split(".").map((segment, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2, // Stagger each line
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{ display: "inline-block" }}
            >
              {segment.trim() +
                (index < heroData.caption.split(".").length - 1 ? "." : "")}
              <br />
            </motion.span>
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
      {/* Bottom gradient overlay for blending */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "120px",
          pointerEvents: "none",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
          zIndex: 1,
        }}
      />
      {/* Bouncing scroll down arrow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 3,
          opacity: 0.85,
        }}
      >
        {/* SVG Arrow */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "bounce 1.5s infinite",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
        >
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            color: "#fff",
            fontSize: "1rem",
            marginTop: 4,
            textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            letterSpacing: 1,
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          Scroll Down
        </span>
      </div>
      {/* Keyframes for bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
      `}</style>
    </div>
  );
}

export default Hero;
