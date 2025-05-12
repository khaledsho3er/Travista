import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  styled,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageForm from "../components/messageForm";
import axios from "axios"; // Make sure this is at the top if it's not already
const BlurredDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% dark overlay
  },
}));

function ContactUs() {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [commentData, setCommentData] = useState({
    content: "",
    author: "",
    memberSince: "",
  });

  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmitComment = async () => {
    try {
      console.log("Submitting comment:", commentData);
      const res = await axios.post(
        "https://158.220.96.121/api/comments",
        commentData
      );
      console.log("Comment submitted successfully:", res.data);
      setOpenCommentDialog(false);
      setCommentData({ content: "", author: "", memberSince: "" }); // Clear form after submit
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <Box className="contact-us-page">
      <Navbar />
      <Box className="contact-us-header">
        <Box className="contact-us-header-titles">
          <Typography variant="h1">Contact Us</Typography>
          <p> Ask for anything or just leave us a note.</p>
          <button className="contact-us-header-btn">Send a message</button>
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
              <button className="contact-us-trips-btn-getdirections">
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
              <button className="contact-us-trips-btn-getdirections">
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
              <button className="contact-us-trips-btn-getdirections">
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
      <BlurredDialog
        open={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ py: 4, backgroundColor: "#FFFFFF56" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Write a Review
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              multiline
              rows={4}
              label="Your Comment"
              name="content"
              value={commentData.content}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Your Name"
              name="author"
              value={commentData.author}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Member Since"
              name="memberSince"
              placeholder="e.g. 2023"
              value={commentData.memberSince}
              onChange={handleChange}
              fullWidth
            />
            <button
              className="btn btn-primary"
              style={{ border: "1px solid var(--maroon)" }}
              onClick={handleSubmitComment}
            >
              Submit Comment
            </button>
          </Box>
        </DialogContent>
      </BlurredDialog>
    </Box>
  );
}
export default ContactUs;
