import React, { useEffect, useState } from "react";
import { Box, Typography, Button, MenuItem, Select } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { RiErrorWarningLine } from "react-icons/ri";

import CareersFAQSection from "../components/careersFAQsection";

function CareersPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.travistasl.com/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        const visibleJobs = data.filter((job) => job.visible === true);
        setRoles(visibleJobs);
        setLoading(false);
      })
      .catch(() => {
        setRoles([]);
        setLoading(false);
      });
  }, []);

  return (
    <Box className="careers-page">
      <Helmet>
        <title>
          Careers at Travista Egypt | Help Shape the Future of Travel
        </title>
        <meta
          name="description"
          content="Join Travista's passionate team and help people travel the world. Explore open roles in marketing, product, finance, and more."
        />
        <meta
          name="keywords"
          content="Travista careers, travel jobs Egypt, travel agency hiring, jobs in tourism, work at Travista"
        />
        <meta
          property="og:title"
          content="Careers at Travista Egypt | Future of Travel Starts Here"
        />
        <meta
          property="og:description"
          content="Discover job opportunities and join a growing team of travel lovers at Travista Egypt."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://travista.vercel.app/careers" />
        <link rel="canonical" href="https://travista.vercel.app/careers" />
      </Helmet>

      <Navbar />
      <header className="careers-header">
        <Box className="careers-hero">
          <Box className="careers-subtitle">
            <span>Careers</span>

            <h1>Help us to build future of travel</h1>
          </Box>
          <p>
            We're a small team of travel aficionados working to help people
            travel and experience the world.
          </p>
          <button className="careers-hero-btn">View open postion</button>
        </Box>
        <img src="assets/careers_header.jpg" alt="Careersimg.png" />
        {/* <img
          class="overlay-photo"
          src="assets/heroicon.png"
          alt="OverlayImage"
        /> */}
      </header>
      {/* Core Values Section */}
      <Box className="careers-core-values">
        <Typography variant="h2" className="careers-core-values-title">
          Our core values are deeply rooted in everyone of us
        </Typography>
        <Box className="careers-core-values-grid">
          <Box className="careers-core-value">
            <img src="assets/keyicon.png" alt="Continually Improve" />
            <div>
              <h3>Take ownership.</h3>
              <p>
                We value a bias for taking action and delivering commitments,
                and we trust our teammates to do so.
              </p>
            </div>
          </Box>
          <Box className="careers-core-value">
            <img src="assets/planticon.png" alt="Continually Improve" />
            <div>
              <h3>Continually improve.</h3>
              <p>
                We find ways to improve each and every day, no matter how small
                the improvement. We strive to apply this mindset to all aspects
                of our work.
              </p>
            </div>
          </Box>
          <Box className="careers-core-value">
            <LightbulbIcon className="careers-icon" />
            <div>
              <h3>Do more with less.</h3>
              <p>
                We encourage resourcefulness and creativity when solving
                problems and delivering value to our members.
              </p>
            </div>
          </Box>
          <Box className="careers-core-value">
            <FingerprintIcon className="careers-icon" />
            <div>
              <h3>Be human.</h3>
              <p>
                We encourage questions, discourage groupthink, and value each
                other's and our members' humanity.
              </p>
            </div>
          </Box>
        </Box>
      </Box>
      <CareersFAQSection />
      {/* Open Roles Section */}
      <Box className="careers-open-roles">
        <Box className="careers-open-roles-container">
          {/* Left Section */}
          <Box className="careers-open-roles-left">
            <Typography variant="h2" className="careers-open-roles-title">
              Open roles
            </Typography>
            <Typography variant="h3" className="careers-open-roles-description">
              See a spot at Travista with your name on it? Show us what you're
              made of.
            </Typography>
            <Box className="careers-open-roles-filters">
              <Select
                defaultValue="All Locations"
                className="careers-filter"
                size="small"
                sx={{
                  borderRadius: "10px",
                  fontSize: "0.8rem",
                  color: "#A5A5A5",
                }}
              >
                <MenuItem value="All Locations">All Locations</MenuItem>
                <MenuItem value="Barcelona">Barcelona</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </Select>
              <Select
                defaultValue="All Departments"
                className="careers-filter"
                size="small"
                sx={{
                  borderRadius: "10px",
                  fontSize: "0.8rem",
                  color: "#A5A5A5",
                }}
              >
                <MenuItem value="All Departments">All Departments</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Product">Product</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Right Section */}
          <Box
            className="careers-open-roles-right"
            sx={{
              alignItems: loading || roles.length === 0 ? "center" : "flex-end",
            }}
          >
            {loading ? (
              <Typography
                variant="h6"
                className="no-jobs-title"
                sx={{ textAlign: "center", mt: 4 }}
              >
                Loading jobs...
              </Typography>
            ) : roles.length === 0 ? (
              <Box
                className="no-jobs-available"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "200px",
                }}
              >
                <RiErrorWarningLine size={48} color="#ccc" />
                <Typography
                  variant="h6"
                  className="no-jobs-title"
                  sx={{ mt: 2, color: "#ccc" }}
                >
                  No available jobs
                </Typography>
              </Box>
            ) : (
              roles.map((role, index) => (
                <Box key={index} className="careers-role-card">
                  <Typography variant="h6" className="role-title">
                    {role.title}
                  </Typography>
                  <Typography variant="h4" className="role-info">
                    {role.department}, {role.location}
                  </Typography>
                  <Typography variant="h4" className="role-type">
                    {role.type}
                  </Typography>
                  <Button
                    sx={{
                      background: "#FFEB69",
                      fontSize: "0.6rem",
                      borderRadius: "20px",
                      color: "black",
                    }}
                    variant="contained"
                    className="learn-more-btn"
                  >
                    Learn more
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CareersPage;
