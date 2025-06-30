import React from "react";
import { Typography, Box, Button } from "@mui/material";
import FAQsComponent from "./FAQs";
import { useNavigate } from "react-router-dom";
function FAQ() {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/contactus");
  };

  return (
    <Box className="faq-section">
      <Box className="faq-title">
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Frequently Asked <br /> Questions
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: { xs: "0.9rem", md: "1.2rem" } }}
        >
          Have any other questions in mind?
        </Typography>

        <Button className="btn btn-primary btn-black" onClick={handleContact}>
          Contact Us
        </Button>
      </Box>
      <FAQsComponent limit={6} selectedSubject="All topics" />
    </Box>
  );
}

export default FAQ;
