import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  TextField,
  styled,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageForm from "../components/messageForm";
import axios from "axios";
import SuccessDialog from "../components/SuccessDialog";
import { FormatQuote } from "@mui/icons-material";
import { Helmet } from "react-helmet";

const BlurredDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% dark overlay
  },
  "& .MuiPaper-root": {
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(5px)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
  },
}));

const QuoteTextField = styled(StyledTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    position: "relative",
    "&::before": {
      content: '"\u201C"', // LEFT DOUBLE QUOTATION MARK
      position: "absolute",
      top: "-10px",
      left: "-10px",
      fontSize: "60px",
      color: "rgba(117, 0, 70, 0.1)",
      fontFamily: "serif",
      pointerEvents: "none",
      zIndex: 1,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px 24px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "1rem",
  backgroundColor: "#750046",
  color: "white !important",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(117, 0, 70, 0.2)",
  "&:hover": {
    backgroundColor: "#5c0036",
    boxShadow: "0 6px 16px rgba(117, 0, 70, 0.3)",
    transform: "translateY(-2px)",
  },
  "& .MuiButton-label": {
    color: "white !important",
  },
  "&:disabled": {
    color: "white !important",
  },
}));

function ContactUs() {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentData, setCommentData] = useState({
    content: "",
    author: "",
    memberSince: "",
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async () => {
    try {
      console.log("Submitting comment:", commentData);
      const res = await axios.post(
        "https://api.travistasl.com/api/comments",
        commentData
      );
      console.log("Comment submitted successfully:", res.data);
      setOpenCommentDialog(false);
      // Show success dialog
      setShowSuccessDialog(true);
      // Clear form after submit
      setCommentData({
        content: "",
        author: "",
        memberSince: "",
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <Box className="contact-us-page">
      <Helmet>
        <title>Travista Egypt | Travel the World with Ease</title>
        <meta
          name="description"
          content="Travista is your go-to travel agency for global adventures, hotel bookings, senior trips, and more. Discover the world with us."
        />
        <meta
          name="keywords"
          content="Travista Egypt, travel agency, hotel booking, senior trips, tour packages"
        />
        <meta
          property="og:title"
          content="Travista Egypt | Global Travel Experts"
        />
        <meta
          property="og:description"
          content="Book your next adventure with Travista."
        />
        <meta property="og:url" content="https://travista.vercel.app/" />
        <link rel="canonical" href="https://travista.vercel.app/" />
      </Helmet>
      <Navbar />
      <Box className="contact-us-header">
        <Box className="contact-us-header-titles">
          <Typography variant="h1">Contact Us</Typography>
          <p> Ask for anything or just leave us a note.</p>
          <button
            className="contact-us-header-btn"
            onClick={() => {
              document
                .querySelector(".FAQs-form")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Send a message
          </button>
          <button
            className="contact-us-header-btn"
            onClick={() => setOpenCommentDialog(true)}
          >
            Write a review
          </button>

          <Box className="contact-us-hero-image">
            <img src="assets/contactus.png" alt="contactus.png" />
          </Box>
        </Box>
        <Box className="contact-us-trips-container">
          <Box className="contact-us-trips-step">
            <Box className="contact-us-trips-head">
              <h3>Cairo, Egypt</h3> <span>06:06AM</span>
            </Box>
            <p>
              47 - A, Ramo building, Ahmed Tayseer St., Golf land 11341, Cairo,
              Egypt
            </p>
            <Box className="contact-us-trips-btns">
              <button
                className="contact-us-trips-btn-getdirections"
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/2wQhQRZPxJ8HFFkCA",
                    "_blank"
                  )
                }
              >
                Get Direction
              </button>
              <button className="contact-us-trips-btn-call">Call Office</button>
            </Box>
          </Box>
          <Box className="contact-us-trips-step">
            <Box className="contact-us-trips-head">
              <h3>Dubai, UAE</h3>
              <span>06:06AM</span>
            </Box>
            <p>18th Street, Deira - Dubai, United Arab Emirates</p>
            <Box className="contact-us-trips-btns">
              <button
                className="contact-us-trips-btn-getdirections"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=18th+Street,+Deira+-+Dubai,+United+Arab+Emirates",
                    "_blank"
                  )
                }
              >
                Get Direction
              </button>
              <button className="contact-us-trips-btn-call">Call Office</button>
            </Box>
          </Box>
          <Box className="contact-us-trips-step">
            <Box className="contact-us-trips-head">
              <h3>Barcelona, Spain</h3>
              <span>06:06AM</span>
            </Box>
            <p>C/ Paris, 45-47, 08029 - Barcelona, Spain</p>
            <Box className="contact-us-trips-btns">
              <button
                className="contact-us-trips-btn-getdirections"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=C/+Paris,+45-47,+08029+-+Barcelona,+Spain",
                    "_blank"
                  )
                }
              >
                Get Direction
              </button>
              <button className="contact-us-trips-btn-call">Call Office</button>
            </Box>
          </Box>
        </Box>
      </Box>

      <section className="FAQs-content">
        <div className="FAQs-form">
          <Box>
            <h2>
              Ask for anything or <br />
              just leave us a note.
            </h2>
            <p>
              We'd love to hear from you. If you'd prefer to email us instead,
              reach <br /> out to{" "}
              <a href="mailto:hello@travista.com">hello@travista.com</a>.
            </p>
          </Box>
          <Box className="FAQs-form-section">
            <MessageForm type={"contactUs"} />
          </Box>
        </div>
      </section>
      <Footer />

      {/* Enhanced Testimonial Dialog */}
      <BlurredDialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Paper
          elevation={0}
          sx={{
            py: 4,
            px: 3,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              sx={{
                bgcolor: "#750046",
                width: 56,
                height: 56,
                boxShadow: "0 4px 12px rgba(117, 0, 70, 0.2)",
              }}
            >
              <FormatQuote />
            </Avatar>
            <Box ml={2}>
              <Typography variant="h5" fontWeight={700}>
                Share Your Experience
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your testimonial helps others discover Travista
              </Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={2.5}>
            <QuoteTextField
              multiline
              rows={5}
              label="Your Testimonial"
              name="content"
              value={commentData.content}
              onChange={handleChange}
              fullWidth
              placeholder="Tell us about your experience with Travista. What did you enjoy most about your journey?"
            />

            <Box display="flex" gap={2} flexWrap="wrap">
              <StyledTextField
                label="Your Name"
                name="author"
                value={commentData.author}
                onChange={handleChange}
                fullWidth
                sx={{ flex: "1 1 60%" }}
                placeholder="John Doe"
              />

              <StyledTextField
                label="Member Since"
                name="memberSince"
                placeholder="e.g. 2023"
                value={commentData.memberSince}
                onChange={handleChange}
                fullWidth
                sx={{ flex: "1 1 30%" }}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mt={1}>
              <Button
                variant="outlined"
                onClick={() => setOpenCommentDialog(false)}
                sx={{
                  borderRadius: "12px",
                  borderColor: "#750046",
                  color: "#750046",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#5c0036",
                    backgroundColor: "rgba(117, 0, 70, 0.05)",
                  },
                }}
              >
                Cancel
              </Button>

              <SubmitButton
                onClick={handleSubmitComment}
                disabled={!commentData.content || !commentData.author}
              >
                Submit Testimonial
              </SubmitButton>
            </Box>
          </Box>
        </Paper>
      </BlurredDialog>

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        formType="review"
        customTitle="Thank You for Your Testimonial!"
        customMessage="We appreciate you sharing your experience with Travista. Your testimonial will help future travelers discover the magic of our services."
      />
    </Box>
  );
}
export default ContactUs;
