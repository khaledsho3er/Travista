import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";

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
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0, // You can set a delay if you want to stagger
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <Typography variant="h4">About us</Typography>
              <Typography variant="h3">
                With over 35 years of experience in aviation and tourism.
              </Typography>
              <Typography variant="h5">
                Mr. Abo Bakr founded Travista with a vision to elevate and
                personalize travel experiences. What began as a local initiative
                has since grown into a globally recognized brand known for its
                reliability, innovation, and commitment to excellence.
              </Typography>
              <Button>Our Journey at a Glance</Button>
            </motion.div>
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
