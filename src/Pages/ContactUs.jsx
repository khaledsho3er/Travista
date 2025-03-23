import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function ContactUs() {
  return (
    <Box className="contact-us-page">
      <Navbar />
      <Box className="contact-us-header">
        <Box className="contact-us-header-titles">
          <Typography variant="h1">Contact Us</Typography>
          <p> Ask for anything or just leave us a note.</p>
          <button className="contact-us-header-btn">Send a message</button>
          <Box className="contact-us-hero-image">
            <img src="Assets/contactus.png" alt="contactus.png" />
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
            <contactUsForm />
          </Box>
        </div>
      </section>
      <Footer />
    </Box>
  );
}
export default ContactUs;
