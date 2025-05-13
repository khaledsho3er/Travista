import React from "react";
import { Box } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { PiGraduationCapBold, PiSuitcaseSimple } from "react-icons/pi";

function StepOne({ tripType, setTripType }) {
  return (
    <Box className="BMI-steps-first-Content">
      <h5>Step 1 of 3</h5>
      <h4>Which best describes your trip?</h4>
      <Box className="trip-buttons-container">
        <button
          className={`trip-button ${
            tripType === "Personal Trip" ? "active" : ""
          }`}
          data-label="Personal Trip"
          onClick={() => setTripType("Personal Trip")}
        >
          <span>
            <FaRegUser />
          </span>
        </button>
        <button
          className={`trip-button ${
            tripType === "Senior Trip" ? "active" : ""
          }`}
          data-label="Senior Trip"
          onClick={() => setTripType("Senior Trip")}
        >
          <span>
            <PiGraduationCapBold />
          </span>
        </button>
        <button
          className={`trip-button ${
            tripType === "Business Trip" ? "active" : ""
          }`}
          data-label="Business Trip"
          onClick={() => setTripType("Business Trip")}
        >
          <span>
            <PiSuitcaseSimple />
          </span>
        </button>
      </Box>
    </Box>
  );
}

export default StepOne;
