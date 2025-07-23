import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CareersFAQ from "./CareersFAQ";
import { motion } from "framer-motion";

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

        <motion.div
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 32px rgba(117,0,70,0.18)",
            borderRadius: "50px",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{ display: "inline-block" }}
        >
          <Button className="btn btn-primary btn-black">
            View open postion
          </Button>
        </motion.div>
      </Box>
      <CareersFAQ />
    </Box>
  );
}

export default CareersFAQSection;
