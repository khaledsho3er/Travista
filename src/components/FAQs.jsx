import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

const FAQsComponent = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisibleFAQs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://158.220.96.121/api/faqs/visible"
        );
        setFaqs(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching visible FAQs:", err);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false);
      }
    };

    fetchVisibleFAQs();
  }, []);

  const handleToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (faqs.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography>No FAQs available at the moment.</Typography>
      </Box>
    );
  }

  return (
    <Box className="faq-list">
      <List>
        {faqs.map((faq, index) => (
          <Box key={faq.faqId || index}>
            <ListItem
              onClick={() => handleToggle(index)}
              style={{ cursor: "pointer" }}
            >
              <Typography variant="h5" style={{ fontSize: "1rem !important" }}>
                <strong>{faq.question}</strong>
              </Typography>
              {openQuestion === index ? <RemoveIcon /> : <AddIcon />}
            </ListItem>
            <div
              className={`FAQs-answer ${openQuestion === index ? "open" : ""}`}
            >
              <Typography
                variant="body1"
                style={{ fontSize: "0.9rem !important" }}
              >
                {faq.answer}
              </Typography>
            </div>
            <hr />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default FAQsComponent;
