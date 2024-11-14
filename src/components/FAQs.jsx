import React, { useState } from "react";
import { Box, Typography, List, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const FAQsComponent = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const handleToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "Are there any extra fees for custom packages?",
      answer:
        "Yes, custom packages may have additional fees depending on the specific services included.",
    },
    {
      question: "Can I build a package for my high school senior trip?",
      answer:
        "Absolutely! We offer tailored packages for high school senior trips.",
    },
    {
      question: "Will I get a travel guide with my package?",
      answer:
        "Yes, a travel guide is included with most packages to enhance your experience.",
    },
    {
      question: "Can I cancel my package?",
      answer:
        "You can cancel your package. Please refer to our cancellation policy for details.",
    },
    {
      question: "What is the fee of postponing my package?",
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
              {openQuestion === index ? <RemoveIcon /> : <AddIcon />}
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

export default FAQsComponent;
