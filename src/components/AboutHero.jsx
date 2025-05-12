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
              We exist to reveal a world of greater travel possibility
            </Typography>
            <Typography variant="h5">
              We're a small team of travel aficionados working to help people
              travel and experience the world.
            </Typography>
            <Button>How to began?</Button>
          </Box>
        </Grid>

        {/* Right Image Column */}
        <Grid item xs={12} md={4}>
          <Box className="about-right-image">
            <img
              src="assets/prague.jpg"
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
