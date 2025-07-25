import React from "react";
import { Typography, Button, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function About() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAboutUs = () => {
    navigate("/About"); // Navigate to Explore Packages page
  };
  return (
    <Box
      className="about-section container-padding"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "1.5rem", md: "2rem" },
        padding: { xs: "2.5rem 5%", md: "5rem 10%" },
      }}
    >
      <Typography
        variant="h2"
        fontSize={{ xs: "1.3rem", sm: "1.7rem", md: "2rem" }}
        fontWeight={700}
      >
        With a sprinkle of wonder and a spirit of adventure, we craft
        unforgettable journeys that leave you inspired, amazed, and craving
        more.
      </Typography>
      <motion.div
        whileHover={{
          scale: 1.08,
          borderRadius: "50px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        style={{ display: "inline-block" }}
      >
        <Button
          className="btn btn-primary"
          sx={{
            padding: { xs: "8px 32px !important", md: "10px 80px !important" },
            fontWeight: "bold",
            fontSize: { xs: "0.9rem", md: "1rem" },
            color: "#750046",
            border: "2px solid #750046",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#750046",
              color: "#fff",
            },
          }}
          onClick={handleAboutUs}
        >
          Our Story
        </Button>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: "2rem", sm: "1.5rem", md: "3rem" },
          marginTop: { xs: "1.5rem", md: "2rem" },
        }}
        className="about-cards"
      >
        <Card
          sx={{
            background: "none",
            border: "none",
            boxShadow: "none",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            minWidth: { xs: "auto", sm: 220 },
          }}
        >
          <img
            src="/assets/icon-1.png"
            alt="figure-1"
            style={{ display: "inline", width: "48px", height: "48px" }}
          />
          <Typography
            variant="h4"
            fontWeight="800"
            fontSize={{ xs: "1.1rem", md: "1.5rem" }}
          >
            Curated experiences
          </Typography>
          <Typography
            variant="body1"
            width={{ xs: "95%", sm: "80%" }}
            margin="0 auto"
            marginTop="16px"
            fontSize={{ xs: "0.95rem", md: "1rem" }}
          >
            Dive into immersive escapes where hidden gems, authentic flavors,
            and unique activities come together for one-of-a-kind travel
            stories.
          </Typography>
        </Card>

        <Card
          sx={{
            background: "none",
            border: "none",
            boxShadow: "none",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            minWidth: { xs: "auto", sm: 220 },
          }}
        >
          <img
            src="/assets/icon-2.png"
            alt="figure-1"
            style={{ display: "inline", width: "48px", height: "48px" }}
          />
          <Typography
            variant="h4"
            fontWeight="800"
            fontSize={{ xs: "1.1rem", md: "1.5rem" }}
          >
            Trips all year long
          </Typography>
          <Typography
            variant="body1"
            width={{ xs: "95%", sm: "80%" }}
            margin="0 auto"
            marginTop="16px"
            fontSize={{ xs: "0.95rem", md: "1rem" }}
          >
            From summer getaways to winter retreats , we make every season the
            perfect time to discover somewhere new.
          </Typography>
        </Card>

        <Card
          sx={{
            background: "none",
            border: "none",
            boxShadow: "none",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            minWidth: { xs: "auto", sm: 220 },
          }}
        >
          <img
            src="/assets/icon-3.png"
            alt="figure-1"
            style={{ display: "inline", width: "48px", height: "48px" }}
          />
          <Typography
            variant="h4"
            fontWeight="800"
            fontSize={{ xs: "1.1rem", md: "1.5rem" }}
          >
            Travel on budget
          </Typography>
          <Typography
            variant="body1"
            width={{ xs: "95%", sm: "80%" }}
            margin="0 auto"
            marginTop="16px"
            fontSize={{ xs: "0.95rem", md: "1rem" }}
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
