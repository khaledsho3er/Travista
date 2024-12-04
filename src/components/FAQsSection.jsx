import React from "react";
import { Typography, Box, Button } from "@mui/material";
import FAQsComponent from "./FAQs";

function FAQ() {
  return (
    <Box className="faq-section">
      <Box className="faq-title">
        <Typography variant="h3" fontWeight={700}>
          Frequently Asked <br /> Questions
        </Typography>

        <Typography variant="body1">
          Have any other questions in mind?
        </Typography>

        <Button className="btn btn-primary btn-black">Contact Us</Button>
      </Box>
      <FAQsComponent />
    </Box>
  );
}

export default FAQ;
