import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaCompass } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";

const StartingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false);

  // Brand colors
  const brandBlue = "#0066cc"; // Replace with your exact blue color if different
  const brandSecondary = "#142328";

  useEffect(() => {
    // Ensure the screen shows for at least 5 seconds
    const minTimeTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000);

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 5; // Slower progress to match 5 second minimum
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(minTimeTimer);
      clearInterval(interval);
    };
  }, []);

  // Check if both minimum time has elapsed and loading is complete
  useEffect(() => {
    if (minTimeElapsed && loadingProgress >= 100) {
      // Show plane animation before completing
      setShowPlaneAnimation(true);

      // Add a delay for the plane animation to complete
      const completeTimer = setTimeout(() => {
        if (onLoadComplete) onLoadComplete();
      }, 2000); // 2 seconds for plane animation

      return () => clearTimeout(completeTimer);
    }
  }, [minTimeElapsed, loadingProgress, onLoadComplete]);

  // Travel-related inspirational quotes
  const quotes = [
    "Adventure awaits, just a compass away.",
    "Explore. Dream. Discover.",
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
        backgroundColor: "#f7f0ea",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Airplane Animation (shows only when loading is complete) */}
      {showPlaneAnimation && (
        <motion.div
          initial={{ x: "-100vw", y: "50vh" }}
          animate={{ x: "100vw", y: "50vh" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaPlaneDeparture size={80} color={brandBlue} />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100vw" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              height: "3px",
              background: brandBlue,
              boxShadow: `0 0 10px ${brandBlue}`,
            }}
          />
        </motion.div>
      )}

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
        {/* Travista Logo/Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "3rem", md: "5rem" },
              color: brandBlue,
              letterSpacing: "5px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              mb: 3,
            }}
          >
            TRAVISTA
          </Typography>
        </motion.div>

        {/* Compass Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <FaCompass size={120} color={brandBlue} className="compass-icon" />
          <style>
            {`.compass-icon {
                animation: pulse 3s infinite ease-in-out;
                filter: drop-shadow(0 0 10px rgba(0, 102, 204, 0.3));
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
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: brandBlue,
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
          transition={{ delay: 0.9, duration: 1 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontStyle: "italic",
              color: brandSecondary,
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
              backgroundColor: "rgba(0, 102, 204, 0.2)",
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
              backgroundColor: brandBlue,
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
              color: brandSecondary,
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
                backgroundColor: brandBlue,
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
