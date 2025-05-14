import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaCompass } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";

const StartingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [showPlaneAnimation, setShowPlaneAnimation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Brand colors
  const brandBlue = "#004381";
  const brandMaroon = "#750046";
  const brandWhite = "#ffffff";

  useEffect(() => {
    // Ensure the screen shows for at least 5 seconds
    const minTimeTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000);

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 5; // Slightly faster progress
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);

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
        setAnimationComplete(true);

        // Add a small delay after animation completes before calling onLoadComplete
        setTimeout(() => {
          if (onLoadComplete) onLoadComplete();
        }, 500);
      }, 2500); // 2.5 seconds for plane animation

      return () => clearTimeout(completeTimer);
    }
  }, [minTimeElapsed, loadingProgress, onLoadComplete]);

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
        background: `linear-gradient(135deg, ${brandBlue} 0%, #0066cc 50%, ${brandMaroon} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.1,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              borderRadius: "50%",
              backgroundColor: brandWhite,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
            }}
          />
        ))}
        <style>
          {`
            @keyframes twinkle {
              0% { opacity: 0.3; transform: scale(1); }
              100% { opacity: 0.8; transform: scale(1.2); }
            }
          `}
        </style>
      </Box>

      {/* Airplane Animation (shows only when loading is complete) */}
      {showPlaneAnimation && (
        <>
          {/* Top half of the screen that will slide up */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: animationComplete ? "-50vh" : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: `linear-gradient(to bottom, ${brandBlue}, ${brandMaroon})`,
              zIndex: 50,
            }}
          />

          {/* Bottom half of the screen that will slide down */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: animationComplete ? "50vh" : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: `linear-gradient(to top, ${brandBlue}, ${brandMaroon})`,
              zIndex: 50,
            }}
          />

          {/* Airplane that flies across the center */}
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "100vw" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              zIndex: 100,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaPlaneDeparture
              size={80}
              color={brandWhite}
              style={{
                filter: `drop-shadow(0 0 10px ${brandWhite})`,
                transform: "rotate(0deg)",
              }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                height: "3px",
                background: brandWhite,
                boxShadow: `0 0 15px ${brandWhite}`,
              }}
            />
          </motion.div>
        </>
      )}

      {/* Main Content */}
      <Box
        sx={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: 3,
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
              color: brandWhite,
              letterSpacing: "5px",
              textShadow: `2px 2px 15px ${brandMaroon}`,
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
          <FaCompass
            size={120}
            color={brandWhite}
            className="compass-icon"
            style={{ filter: `drop-shadow(0 0 10px ${brandMaroon})` }}
          />
          <style>
            {`.compass-icon {
                animation: pulse 3s infinite ease-in-out;
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
              color: brandWhite,
              mt: 4,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              textShadow: `2px 2px 8px ${brandBlue}`,
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
              color: brandWhite,
              maxWidth: "600px",
              mb: 4,
              px: 2,
              textShadow: `1px 1px 5px ${brandBlue}`,
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
              backgroundColor: "rgba(255, 255, 255, 0.3)",
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
              background: `linear-gradient(to right, ${brandWhite}, ${brandMaroon})`,
              borderRadius: "2px",
              transition: "width 0.3s ease-out",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1,
              color: brandWhite,
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Preparing your adventure... {Math.round(loadingProgress)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StartingScreen;
