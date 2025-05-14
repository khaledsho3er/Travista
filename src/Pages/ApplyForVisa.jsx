import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ApplyForVisaForm from "../components/ApplyVisaForm";
import FAQsComponent from "../components/FAQs";
import { useNavigate } from "react-router-dom";

function ApplyForVisa() {
  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/contactus"); // Navigate to Explore Packages page
  };
  return (
    <Box classname="ApplyForVisa-page">
      <Navbar />
      <header className="ApplyForVisa-header">
        <Box className="ApplyForVisa-hero">
          <Box className="subTitle-ApplyForVisa">
            <p>Apply for visa</p>

            <h1>
              Unlock Global
              <br /> Oppurtunities
            </h1>
          </Box>
          <p>
            Our streamlined process ensures a seamless experience, allowing you
            to embark on your desired journey with ease. Discover a world of
            limitless possibilities by applying for your visa today.
          </p>
          <button
            className="ApplyForVisa-contact-btn"
            onClick={() => {
              document
                .querySelector(".ApplyForVisa-form")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Apply Now
          </button>
        </Box>
        <img src="assets/ApplyForVisaHero.png" alt="ApplyForVisa" />
      </header>
      <section className="ApplyForVisa-content">
        <Box className="ApplyForVisa-faqs-section">
          <Box className="ApplyForVisa-faqs-title">
            <Typography variant="h2" fontWeight={700}>
              Frequently Asked <br /> Questions
            </Typography>

            <Typography variant="body1">
              Have any other questions in mind?
            </Typography>

            <Button
              className="btn btn-primary btn-black"
              onClick={handleContact}
            >
              Contact Us
            </Button>
          </Box>

          <FAQsComponent />
        </Box>
      </section>
      <section className="ApplyForVisa-Form-content">
        <div className="ApplyForVisa-form">
          <Box>
            <Typography variant="h2" fontWeight={700}>
              Application Form
            </Typography>
            <p>Fill the form and we’ll get back to you as soon as possible.</p>
          </Box>
          <Box className="ApplyForVisa-form-section">
            <ApplyForVisaForm />
          </Box>
        </div>
      </section>
      <Footer />
    </Box>
  );
}
export default ApplyForVisa;
