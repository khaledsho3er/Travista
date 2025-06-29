import React from "react";
import { Box } from "@mui/material";

function Timeline() {
  return (
    <Box>
      <Box className="about-background-section">
        <Box className="about-image-container">
          <img src="assets/timeline.png" alt="Timeline" />
          <Box className="about-card-container">
            {" "}
            {/* Corrected className */}
            {/* about-Card 1 */}
            <Box className="about-card about-card-1">
              <h3>Milestone 1</h3>
              <p>
                Travista was founded with a vision to make travel accessible for
                everyone.
              </p>
            </Box>
            {/* about-Card 2 */}
            <Box className="about-card about-card-2">
              <h3>Milestone 2</h3>
              <p>
                Launched our first group tour, connecting travelers from
                different backgrounds.
              </p>
            </Box>
            {/* about-Card 3 */}
            <Box className="about-card about-card-3">
              <h3>Milestone 3</h3>
              <p>
                Expanded our destinations to include over 20 countries
                worldwide.
              </p>
            </Box>
            {/* about-Card 4 */}
            <Box className="about-card about-card-4">
              <h3>Milestone 4</h3>
              <p>
                Introduced personalized travel packages for unique customer
                experiences.
              </p>
            </Box>
            {/* about-Card 5 */}
            <Box className="about-card about-card-5">
              <h3>Milestone 5</h3>
              <p>
                Partnered with leading airlines and hotels for exclusive deals.
              </p>
            </Box>
            {/* about-Card 6 */}
            <Box className="about-card about-card-6">
              <h3>Milestone 6</h3>
              <p>Launched our user-friendly online booking platform.</p>
            </Box>
            {/* about-Card 7 */}
            <Box className="about-card about-card-7">
              <h3>Milestone 7</h3>
              <p>Reached 10,000 happy travelers milestone.</p>
            </Box>
            {/* about-Card 8 */}
            <Box className="about-card about-card-8">
              <h3>Milestone 8</h3>
              <p>
                Introduced 24/7 customer support for seamless travel assistance.
              </p>
            </Box>
            {/* about-Card 9 */}
            <Box className="about-card about-card-9">
              <h3>Milestone 9</h3>
              <p>
                Launched eco-friendly travel initiatives to promote sustainable
                tourism.
              </p>
            </Box>
            {/* about-Card 10 */}
            <Box className="about-card about-card-10">
              <h3>Milestone 10</h3>
              <p>Recognized as a top travel agency in the region.</p>
            </Box>
            {/* about-Card 11 */}
            <Box className="about-card about-card-11">
              <h3>Milestone 11</h3>
              <p>Expanded our team with passionate travel experts.</p>
            </Box>
            {/* about-Card 12 */}
            <Box className="about-card about-card-12">
              <h3>Milestone 12</h3>
              <p>
                Continuing to innovate and inspire journeys for travelers
                worldwide.
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Timeline;
