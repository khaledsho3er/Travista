import React from "react";
import { Box, Typography } from "@mui/material";

function Hero() {
  return (
    <>
      <div className="hero-section">
        <Box sx={{ zIndex: 2, width: "90%", margin: "0 auto" }}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "700",
              textAlign: "center",
              fontSize: "5rem",
            }}
          >
            We exist to reveal a world <br /> of greater travel possibility.
          </Typography>
        </Box>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default Hero;
