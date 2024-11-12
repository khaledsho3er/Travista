import React from "react";
import { Typography, Button, Box } from "@mui/material";

const UpcomingTrip = [
  {
    image: "/assets/latest-trip.png",
    title: "Discover Central Europe",
    destinations: "Vienna, Budapest, Prague, Innsbruck, Kitzbühel, and Vienna",
    description:
      "Unleash your inner wanderer in Central Europe's enchanting embrace. From fairytale castles to cobblestone streets, embark on a whimsical adventure you'll never forget. Let us be your guide to a magical journey through the heart of Europe.",
  },
];

function Highlight() {
  return (
    <Box
      sx={{
        background: `url('${UpcomingTrip[0].image}')`,
        height: "95vh",
        backgroundRepeat: "no-repeat",
      }}
      className="highlight-section container-padding"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
          height: "100%",
        }}
        className="highlight-container"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            color: "white",
            width: "60%",
            textAlign: "left",
          }}
          className="highlight-content"
        >
          <br></br>
          <Typography variant="h4" fontSize="6rem" fontWeight="900">
            {UpcomingTrip[0].title}
          </Typography>
          <Typography variant="h5" fontWeight="700">
            {UpcomingTrip[0].destinations}
          </Typography>
          <Typography variant="body1">{UpcomingTrip[0].description}</Typography>
          <Box className="highlight-btns" display="flex" gap="2rem">
            <Button
              className="btn btn-secondary"
              sx={{ padding: "10px 80px !important" }}
            >
              Explore Trip
            </Button>
            <Button
              className="btn btn-primary"
              sx={{ padding: "10px 80px !important" }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Highlight;
