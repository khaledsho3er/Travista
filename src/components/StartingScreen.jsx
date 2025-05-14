import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaCompass } from "react-icons/fa";
import { motion } from "framer-motion";

const StartingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onLoadComplete) onLoadComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  // Travel-related inspirational quotes
  const quotes = [
    "Adventure awaits, just a compass away.",
    "The world is a book, and those who do not travel read only one page.",
    "Travel far, travel wide, travel deep.",
    "Not all who wander are lost.",
    "Life is short, and the world is wide.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--cream, #f7f0ea)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 3D Travista Text in Background */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.1,
          transform: "scale(2.5)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "8rem", md: "15rem" },
            color: "var(--maroon, #750046)",
            textShadow: "5px 5px 10px rgba(0,0,0,0.2)",
            letterSpacing: "10px",
            transform: "perspective(500px) rotateX(20deg)",
          }}
        >
          TRAVISTA
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Compass Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <FaCompass size={120} color="#750046" className="compass-icon" />
          <style>
            {`.compass-icon {
                animation: pulse 3s infinite ease-in-out;
                filter: drop-shadow(0 0 10px rgba(117, 0, 70, 0.3));
              }
              @keyframes pulse {
                0% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.1) rotate(180deg); }
                100% { transform: scale(1) rotate(360deg); }
              }`}
          </style>
        </motion.div>

        {/* Animated Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "var(--maroon, #750046)",
              mt: 4,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Your Journey Begins
          </Typography>
        </motion.div>

        {/* Inspirational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontStyle: "italic",
              color: "#142328",
              maxWidth: "600px",
              mb: 4,
              px: 2,
            }}
          >
            "{randomQuote}"
          </Typography>
        </motion.div>

        {/* Loading Progress */}
        <Box sx={{ width: "250px", position: "relative", mt: 2 }}>
          <Box
            sx={{
              height: "4px",
              width: "100%",
              backgroundColor: "rgba(117, 0, 70, 0.2)",
              borderRadius: "2px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "4px",
              width: `${loadingProgress}%`,
              backgroundColor: "var(--maroon, #750046)",
              borderRadius: "2px",
              transition: "width 0.3s ease-out",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1,
              color: "#142328",
            }}
          >
            Preparing your adventure... {Math.round(loadingProgress)}%
          </Typography>
        </Box>

        {/* Animated Decorative Elements */}
        <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              component={motion.div}
              sx={{
                position: "absolute",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "var(--maroon, #750046)",
                opacity: 0.2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StartingScreen;
