import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

function AboutHero() {
  return (
    <section className="About-hero-section">
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left Image Column */}
        <Grid item xs={12} md={4}>
          <Box className="about-left-image">
            <img
              src="assets/prague.jpg"
              alt="Pic1"
              className="about-hero-image"
            />
          </Box>
        </Grid>

        {/* Center Content Column (Text, Title, Button) */}
        <Grid item xs={12} md={4}>
          <Box className="about-center-content">
            <Typography variant="h4">About us</Typography>
            <Typography variant="h3">
              We’re here to unlock a world full of travel possibilities.
            </Typography>
            <Typography variant="h5">
              As a passionate team of travel lovers, we’re dedicated to helping
              you explore, discover, and truly experience the world.
            </Typography>
            <Button>How to began?</Button>
          </Box>
        </Grid>

        {/* Right Image Column */}
        <Grid item xs={12} md={4}>
          <Box className="about-right-image">
            <img
              src="assets/prague2.jpg"
              alt="Pic2"
              className="about-hero-image"
            />
          </Box>
        </Grid>
      </Grid>
    </section>
  );
}

export default AboutHero;
