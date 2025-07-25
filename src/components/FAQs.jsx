import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FAQsComponent = ({
  selectedSubject = "All topics",
  setSelectedSubject,
  limit,
}) => {
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [allFaqs, setAllFaqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedFaqs, setDisplayedFaqs] = useState([]);

  console.log("FAQsComponent rendered with limit:", limit);
  console.log("selectedSubject:", selectedSubject);

  // Fetch all visible FAQs
  useEffect(() => {
    const fetchVisibleFAQs = async () => {
      try {
        setLoading(true);
        console.log("Fetching FAQs...");
        const response = await axios.get(
          "https://api.travistasl.com/api/faqs/visible"
        );
        const faqsData = response.data;
        console.log("Fetched FAQs:", faqsData);
        setAllFaqs(faqsData);

        // Extract unique subjects for the filter dropdown
        const uniqueSubjects = [...new Set(faqsData.map((faq) => faq.subject))];
        setSubjects(uniqueSubjects);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching visible FAQs:", err);
        setError("Failed to load FAQs. Please try again later.");
        setLoading(false);
      }
    };

    fetchVisibleFAQs();
  }, []);

  // Filter FAQs when selectedSubject changes
  useEffect(() => {
    console.log("Filtering FAQs for subject:", selectedSubject);
    console.log("All FAQs:", allFaqs);

    if (selectedSubject === "All topics") {
      setFaqs(allFaqs);
    } else {
      const filtered = allFaqs.filter((faq) => faq.subject === selectedSubject);
      setFaqs(filtered);
    }
  }, [selectedSubject, allFaqs]);

  // Apply limit to displayed FAQs
  useEffect(() => {
    console.log("Applying limit:", limit);
    console.log("FAQs before limit:", faqs);

    if (limit && faqs.length > limit) {
      const limitedFaqs = faqs.slice(0, limit);
      console.log("Limited FAQs:", limitedFaqs);
      setDisplayedFaqs(limitedFaqs);
    } else {
      console.log("Using all FAQs (no limit applied)");
      setDisplayedFaqs(faqs);
    }

    console.log("DisplayedFAQs after limit applied:", displayedFaqs);
  }, [faqs, limit, displayedFaqs]);

  // Update the dropdown in the parent component
  useEffect(() => {
    // Find the select element in the parent component
    const selectElement = document.querySelector(".FAQs-filter");
    if (selectElement && subjects.length > 0 && setSelectedSubject) {
      console.log("Updating select element with subjects:", subjects);
      // Clear existing options except the first one (All topics)
      while (selectElement.options.length > 1) {
        selectElement.remove(1);
      }

      // Add new options based on unique subjects
      subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        selectElement.appendChild(option);
      });
    }
  }, [subjects, setSelectedSubject]);

  const handleToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleViewAllFAQs = () => {
    navigate("/faqs");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
        <Typography ml={2}>Loading FAQs...</Typography>
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

  if (displayedFaqs.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography>
          {selectedSubject === "All topics"
            ? "No FAQs available at the moment."
            : `No FAQs available for ${selectedSubject}.`}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="faq-list"
      sx={{
        width: { xs: "90%", md: "50%" },
        margin: { xs: "0 auto", md: "0" },
      }}
    >
      <List>
        {displayedFaqs.map((faq, index) => (
          <Box key={faq.faqId || index}>
            <ListItem
              onClick={() => handleToggle(index)}
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
              >
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
            <AnimatePresence initial={false}>
              {openQuestion === index && (
                <motion.div
                  key="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.9rem !important", py: 1 }}
                  >
                    {faq.answer}
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            <hr />
          </Box>
        ))}
      </List>

      {/* Show "View All FAQs" button if there are more FAQs than the limit */}
      {limit && faqs.length > limit && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleViewAllFAQs}
            sx={{
              borderRadius: "20px",
              padding: "8px 24px",
              borderColor: "#27063b",
              color: "#27063b",
              "&:hover": {
                borderColor: "#27063b",
                backgroundColor: "rgba(39, 6, 59, 0.04)",
              },
            }}
          >
            View All FAQs
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FAQsComponent;
