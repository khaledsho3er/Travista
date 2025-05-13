import React from "react";
import { Box, Typography, Button, MenuItem, Select } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import CareersFAQSection from "../components/careersFAQsection";

function CareersPage() {
  const roles = [
    {
      title: "Marketing Associate",
      department: "Marketing",
      location: "Barcelona",
      type: "Full-time",
    },
    {
      title: "Sales Director",
      department: "Sales",
      location: "Barcelona",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Barcelona",
      type: "Full-time",
    },
    {
      title: "Accountant",
      department: "Finance",
      location: "Barcelona",
      type: "Full-time",
    },
  ];

  return (
    <Box className="careers-page">
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
        <img src="assets/careersheropic.png" alt="Careersimg.png" />
        <img
          class="overlay-photo"
          src="assets/heroicon.png"
          alt="OverlayImage"
        />
      </header>
      {/* Core Values Section */}
      <Box className="careers-core-values">
        <Typography variant="h2" className="careers-core-values-title">
          Our core values are deeply rooted in everyone of us
        </Typography>
        <Box className="careers-core-values-grid">
          <Box className="careers-core-value">
            <img src="assets/careers/keyicon.png" alt="Continually Improve" />
            <div>
              <h3>Take ownership.</h3>
              <p>
                We value a bias for taking action and delivering commitments,
                and we trust our teammates to do so.
              </p>
            </div>
          </Box>
          <Box className="careers-core-value">
            <img src="assets/careers/planticon.png" alt="Continually Improve" />
            <div>
              <h3>Continually improve.</h3>
              <p>
                We find ways to improve each and every day, no matter how small
                the improvement.
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
          <Box className="careers-open-roles-right">
            {roles.map((role, index) => (
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
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default CareersPage;
