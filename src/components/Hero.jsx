import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Hero({ preloadedData = null }) {
  const [heroData, setHeroData] = useState(preloadedData);
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    if (heroData && heroData.caption) {
      const fullText = heroData.caption;
      let index = 0;

      const typeInterval = setInterval(() => {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
        if (index >= fullText.length) clearInterval(typeInterval);
      }, 80); // Speed of typing (ms per character)

      return () => clearInterval(typeInterval);
    }
  }, [heroData]);

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
        overflow: "hidden",
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
              xs: "1.4rem",
              sm: "2.5rem",
              md: "4rem",
              lg: "5rem",
            },
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
            whiteSpace: "pre-line",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: "inline-block" }}
          >
            {typedText}
          </motion.span>
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            style={{
              display: "inline-block",
              marginLeft: "4px",
              color: "white",
            }}
          >
            |
          </motion.span>
        </Typography>

        <Box className="hero-btns">
          <motion.div
            whileHover={{
              scale: 1.08,
              boxShadow: "0 8px 32px rgba(117,0,70,0.18)",
              borderRadius: "50px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{ display: "inline-block" }}
          >
            <Button
              className="btn btn-primary"
              onClick={() => navigate("/packages")}
            >
              Explore Packages & Tours
            </Button>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.08,
              boxShadow: "0 8px 32px rgba(117,0,70,0.18)",
              borderRadius: "50px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{ display: "inline-block" }}
          >
            <Button
              className="btn btn-secondary"
              onClick={() => navigate("/buildmypackage")}
            >
              Build My Package
            </Button>
          </motion.div>
        </Box>
      </Box>

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
