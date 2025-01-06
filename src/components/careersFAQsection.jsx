import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CareersFAQ from "./CareersFAQ";

function CareersFAQSection() {
  return (
    <Box className="faq-section">
      <Box className="faq-title">
        <Typography variant="h3" fontWeight={700}>
          Perks and benefits
        </Typography>

        <Typography
          variant="body1"
          sx={{ marginBottom: "1rem", paddingRight: "1rem" }}
        >
          We believe that by taking care of our team, our team will take care of
          our travellers.
        </Typography>

        <Button className="btn btn-primary btn-black">View open postion</Button>
      </Box>
      <CareersFAQ />
    </Box>
  );
}

export default CareersFAQSection;
