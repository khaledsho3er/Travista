import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MessageForm from "../components/messageForm";
import FAQsComponent from "../components/FAQs";
import { useNavigate } from "react-router-dom";
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
      <Navbar />
      <header className="FAQs-hero">
        <h1>
          Your questions,<br></br> answered.
        </h1>
        <p>
          If you have any questions not mentioned below, contact us with how we
          could help you.
        </p>
        <button className="FAQs-contact-btn" onClick={handleContact}>
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
              <a href="mailto:hello@travista.com">hello@travista.com</a>.
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
