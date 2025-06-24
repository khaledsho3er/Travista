import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ApplyForVisaForm from "../components/ApplyVisaForm";
import FAQsComponent from "../components/FAQs";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function ApplyForVisa() {
  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/contactus"); // Navigate to Explore Packages page
  };
  return (
    <Box classname="ApplyForVisa-page">
      <Helmet>
        <title>Apply for Travel Visa | Travista Egypt</title>
        <meta
          name="description"
          content="Apply for your travel visa easily with Travista. Begin your journey today with our hassle-free visa application process tailored to your needs."
        />
        <meta
          name="keywords"
          content="Travista, visa application, travel visa, Egypt travel, travel agency, apply visa online"
        />
        <meta
          property="og:title"
          content="Apply for Travel Visa | Travista Egypt"
        />
        <meta
          property="og:description"
          content="Start your travel journey with a smooth visa application experience at Travista. Explore the world with ease."
        />
        <meta
          property="og:image"
          content="https://travistaegypt.com/assets/visaapply.jpg"
        />
        <meta property="og:url" content="https://travistaegypt.com/applyvisa" />
        <link rel="canonical" href="https://travistaegypt.com/applyvisa" />
      </Helmet>
      <Navbar />
      <header className="ApplyForVisa-header">
        <Box className="ApplyForVisa-hero">
          <Box className="subTitle-ApplyForVisa">
            <p>Apply for visa</p>

            <h1>
              Open the Door
              <br />
              to the World
            </h1>
          </Box>
          <p>
            Our hassle-free visa process makes your travel dreams effortless.
            Whether you're chasing new horizons or planning your next adventure,
            we’l get you there . smoothly and stress-free. Apply today and
            explore without limits.
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
        <img src="assets/apply_for_visa.jpg" alt="ApplyForVisa" />
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

          {/* Add FAQsComponent with explicit props */}
          <FAQsComponent limit={6} selectedSubject="All topics" />
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
