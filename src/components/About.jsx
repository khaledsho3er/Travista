import React from "react";
import { Typography, Button, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAboutUs = () => {
    navigate("/About"); // Navigate to Explore Packages page
  };
  return (
    <Box
      className="about-section container-padding"
      sx={{ textAlign: "center" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="2rem"
      padding="5rem 10%"
    >
      <Typography variant="h2" fontSize="2rem">
        With a touch of magic and a dash of adventure, we curate extraordinary
        experiences that will leave you enchanted and longing for more.
      </Typography>

      <Button
        className="btn btn-primary"
        sx={{ padding: "10px 80px !important" }}
        onClick={handleAboutUs}
      >
        Our Story
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          marginTop: "2rem",
        }}
        className="about-cards"
      >
        <Card sx={{ background: "none", border: "none", boxShadow: "none" }}>
          <img src="/assets/icon-1.png" alt="figure-1" />
          <Typography variant="h4" fontWeight="800">
            Curated experiences
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            We curate whimsical journeys, blending hidden gems, local flavors,
            and offbeat activities for unforgettable travel experiences.
          </Typography>
        </Card>

        <Card sx={{ background: "none", border: "none", boxShadow: "none" }}>
          <img src="/assets/icon-2.png" alt="figure-1" />
          <Typography variant="h4" fontWeight="800">
            Trips all year long
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            We weave our travel magic year-round, ensuring every season becomes
            an opportunity for extraordinary adventures.
          </Typography>
        </Card>

        <Card sx={{ background: "none", border: "none", boxShadow: "none" }}>
          <img src="/assets/icon-3.png" alt="figure-1" />
          <Typography variant="h4" fontWeight="800">
            Travel on budget
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            We craft budget-friendly escapes, ensuring your travel dreams become
            a reality without breaking the bank.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default About;
