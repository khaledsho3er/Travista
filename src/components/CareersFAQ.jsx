import React, { useState } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion } from "framer-motion";

const CareersFAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "Live Your Best Work Life",
      answer:
        "Yes, custom packages may have additional fees depending on the specific services included.",
    },
    {
      question: "Top-tier health, vision, and dental inusrance",
      answer:
        "Absolutely! We offer tailored packages for high school senior trips.",
    },
    {
      question: "Flex working hours",
      answer:
        "Yes, a travel guide is included with most packages to enhance your experience.",
    },
    {
      question: "Take your birthday off",
      answer:
        "You can cancel your package. Please refer to our cancellation policy for details.",
    },
    {
      question: "Paid time off",
      answer:
        "The postponing fee depends on the package and timing of the request. Contact us for specific details.",
    },
    {
      question: "Travel with half the price",
      answer:
        "The postponing fee depends on the package and timing of the request. Contact us for specific details.",
    },
    {
      question: "Time off to volunteer",
      answer:
        "The postponing fee depends on the package and timing of the request. Contact us for specific details.",
    },
    {
      question: "Team activity hours",
      answer:
        "The postponing fee depends on the package and timing of the request. Contact us for specific details.",
    },
  ];

  return (
    <Box className="faq-list">
      <List>
        {faqs.map((faq, index) => (
          <Box key={index}>
            <ListItem
              onClick={() => handleToggle(index)}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h5">
                <strong>{faq.question}</strong>
              </Typography>
              <motion.span
                initial={false}
                animate={{ rotate: openQuestion === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                {openQuestion === index ? <RemoveIcon /> : <AddIcon />}
              </motion.span>{" "}
            </ListItem>
            <div
              className={`FAQs-answer ${openQuestion === index ? "open" : ""}`}
            >
              <Typography variant="body1">{faq.answer}</Typography>
            </div>
            <hr />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default CareersFAQ;
