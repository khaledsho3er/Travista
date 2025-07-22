import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageForm from "../components/messageForm";
import FAQsComponent from "../components/FAQs";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
function FAQsPage() {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("All topics");

  const handleContact = () => {
    navigate("/contactus");
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <Box className="FAQs-page">
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
        <meta property="og:url" content="https://travistasl.com/" />
        <link rel="canonical" href="https://travistasl.com/" />
      </Helmet>
      <Navbar />
      <header className="FAQs-hero">
        <h1>
          Your questions,<br></br> answered.
        </h1>
        <p>
          If you have any questions not mentioned below, contact us with how we
          could help you.
        </p>
        <button
          className="FAQs-contact-btn"
          style={{ marginTop: "1rem" }}
          onClick={handleContact}
        >
          Contact Us
        </button>
      </header>
      <section className="FAQs-filter-section">
        <select
          className="FAQs-filter"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          <option value="All topics">All topics</option>
          {/* The options will be dynamically populated by FAQsComponent */}
        </select>
      </section>
      <section className="FAQs-content">
        <FAQsComponent
          limit={null}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <FAQsComponent
          limit={null}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </section>
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
              <a href="mailto:reservation@travistaegypt.com">
                reservation@travistaegypt.com
              </a>
              .
            </p>
          </Box>
          <Box className="FAQs-form-section">
            <MessageForm type={"faq"} />
          </Box>
        </div>
      </section>
      <Footer />
    </Box>
  );
}
export default FAQsPage;
