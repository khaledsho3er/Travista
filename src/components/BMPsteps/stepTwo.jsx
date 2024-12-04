import React, { useState } from "react";
import { Box, Slider, Typography } from "@mui/material";

function StepTwo() {
  const [travellers, setTravellers] = useState(1);
  const [flexibility, setFlexibility] = useState(2);
  const [budget, setBudget] = useState(2390);

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue);
  };
  return (
    <Box className="step-two-container">
      <h5>Step 2 of 3</h5>
      <h4>Set the stage</h4>
      <p>Select the starting point of your voyage...</p>

      <Box className="step-two-container-input-group">
        <select className="step-two-container-dropdown">
          <option>Departure country</option>
        </select>
        <select className="step-two-container-dropdown">
          <option>Departure city</option>
        </select>
      </Box>

      <Box className="step-two-container-travellers-container">
      <label className="step-two-travellers-label">No. of travellers</label>
      <Box className="step-two-container-travellers-counter">
        <span className="step-two-counter-travellers-value">{travellers}</span>
        <div className="step-two-travellers-buttons">
          <button
            onClick={() => setTravellers(Math.max(1, travellers - 1))}
            className="step-two-container-travellers-counter-btn"
          >
            -
          </button>
          <button
            onClick={() => setTravellers(travellers + 1)}
            className="step-two-container-travellers-counter-btn"
          >
            +
          </button>
        </div>
      </Box>
    </Box>
    <Box className="budget-slider-container">
      {/* Label */}
      <Box className="budget-slider-label">
        <Typography variant="subtitle1" className="budget-slider-title">
          Budget per person
        </Typography>

        <Typography
          variant="subtitle2"
          className="budget-slider-current"
        >
          €{budget}/ Person
        </Typography>
      </Box>

      {/* Slider */}
      <Box className="budget-slider-box">
      <Slider
          value={budget}
          min={500}
          max={5000}
          step={100}
          onChange={handleBudgetChange}
          className="budget-slider"
          valueLabelDisplay="off" // Disable default value label
          componentsProps={{
            thumb: {
              "data-value": `€${budget}`, // Pass budget value dynamically
            },
          }}
          sx={{
            color: "#990066",
          }}
        />
     
      </Box>

      {/* Description */}
      <Box className="budget-slider-description">
        <p>
          The maximum amount per person including round-trip flight tickets,
          accommodation in selected cities, an optional travel guide.
        </p>
      </Box>
    </Box>



    <Box className="step-two-container-travel-options">
  <Box className="step-two-container-travel-date-left">
    <label>Travel date</label>
    <select className="step-two-container-travel-date-dropdown">
      <option>Select</option>
    </select>
  </Box>
  <Box className="step-two-container-travel-date-right">
    <label>Flexibility</label>
    <Box className="step-two-container-flexibility">
      <span className="step-two-counter-flexibilty-value">+/- {flexibility} days</span>
      <Box className="step-two-flexibility-buttons">
        <button
          onClick={() => setFlexibility(Math.max(0, flexibility - 1))}
          className="step-two-container-flexibility-btn"
        >
          -
        </button>
        <button
          onClick={() => setFlexibility(flexibility + 1)}
          className="step-two-container-flexibility-btn"
        >
          +
        </button>
      </Box>
    </Box>
  </Box>
</Box>

    </Box>
  );
}

export default StepTwo;
