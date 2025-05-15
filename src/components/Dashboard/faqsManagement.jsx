import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
    subject: "",
  });

  // Fetch FAQs from API
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get("https://158.220.96.121/api/faqs");
      setFaqs(response.data);
    } catch (error) {
      toast.error("Error fetching FAQs");
    }
  };

  // Open the dialog (for adding/editing an FAQ)
  const handleOpen = (faq = null) => {
    setSelectedFAQ(faq);
    setFaqData(
      faq
        ? { question: faq.question, answer: faq.answer, subject: faq.subject }
        : { question: "", answer: "", subject: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFAQ(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setFaqData({ ...faqData, [e.target.name]: e.target.value });
  };

  // Add or Update FAQ
  const handleSave = async () => {
    if (!faqData.question || !faqData.answer || !faqData.subject) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      if (selectedFAQ) {
        await axios.put(
          `https://158.220.96.121/api/faqs/${selectedFAQ.faqId}`,
          faqData
        );
        toast.success("FAQ updated successfully!");
      } else {
        await axios.post("https://158.220.96.121/api/faqs", faqData);
        toast.success("FAQ added successfully!");
      }

      fetchFAQs();
      handleClose();
    } catch (error) {
      toast.error("Error saving FAQ");
    }
  };

  // Delete FAQ
  const handleDelete = async (faqId) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await axios.delete(`https://158.220.96.121/api/faqs/${faqId}`);
      toast.success("FAQ deleted successfully!");
      fetchFAQs();
    } catch (error) {
      toast.error("Error deleting FAQ");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        FAQs Management
      </Typography>

      {/* Add FAQ Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add FAQ
      </Button>

      {/* FAQs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Question</strong>
              </TableCell>
              <TableCell>
                <strong>Answer</strong>
              </TableCell>
              <TableCell>
                <strong>Subject</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.faqId}>
                <TableCell>{faq.faqId}</TableCell>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>{faq.subject}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(faq)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(faq.faqId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit FAQ Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedFAQ ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            name="question"
            value={faqData.question}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Answer"
            name="answer"
            value={faqData.answer}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Subject"
            name="subject"
            value={faqData.subject}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedFAQ ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default FAQManagement;
