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
        With a sprinkle of wonder and a spirit of adventure, we craft
        unforgettable journeys that leave you inspired, amazed, and craving
        more.
      </Typography>

      <Button
        className="btn btn-primary"
        sx={{
          padding: "10px 80px !important",
          fontweight: "bold",
          color: "white",
          backgroundColor: "var(--maroon)",
        }}
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
          <img
            src="/assets/icon-1.png"
            alt="figure-1"
            style={{ display: "inline" }}
          />
          <Typography variant="h4" fontWeight="800">
            Curated experiences
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            Dive into immersive escapes where hidden gems, authentic flavors,
            and unique activities come together for one-of-a-kind travel
            stories.
          </Typography>
        </Card>

        <Card sx={{ background: "none", border: "none", boxShadow: "none" }}>
          <img
            src="/assets/icon-2.png"
            alt="figure-1"
            style={{ display: "inline" }}
          />
          <Typography variant="h4" fontWeight="800">
            Trips all year long
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            From summer getaways to winter retreats , we make every season the
            perfect time to discover somewhere new.
          </Typography>
        </Card>

        <Card sx={{ background: "none", border: "none", boxShadow: "none" }}>
          <img
            src="/assets/icon-3.png"
            alt="figure-1"
            style={{ display: "inline" }}
          />
          <Typography variant="h4" fontWeight="800">
            Travel on budget
          </Typography>
          <Typography
            variant="body1"
            width="80%"
            margin="0 auto"
            marginTop="20px"
          >
            Live your travel dreams without the splurge. We make unforgettable
            trips affordable — so you never have to choose between budget and
            adventure.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default About;
