import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import StepTwo from "../components/BMPsteps/stepTwo";
import StepOne from "../components/BMPsteps/stepOne";
import StepThree from "../components/BMPsteps/stepThree";
function BuildMyPackageSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne/>
        );
      case 2:
        return (
         <StepTwo/>
        );
      case 3:
        return (
          <StepThree/>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Navbar />
      <main className="BMP-steps-main">
        <section className="BMP-steps-hero">
          <div className="BMP-steps-hero-content-container">
            <Box className="BMP-steps-hero-image-left">
              <img src="Assets/zinzibar.jpg" alt="Hero 1" />
            </Box>
            <Box className="BMP-steps-content">{renderContent()}</Box>
            <Box className="BMP-steps-hero-image-right">
              <img src="Assets/zinzibar.jpg" alt="Hero 2" />
            </Box>
          </div>
        </section>
      </main>
      <Box className="steps-Actions-Buttons">
        <button
          className="steps-action-button steps-back-button"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Go back
        </button>
        <button
          className="steps-action-button steps-next-button"
          onClick={handleNext}
          disabled={currentStep === 3}
        >
          {currentStep === 3 ? "Finish" : "Next"}
          </button>
      </Box>
    </Box>
  );
}

export default BuildMyPackageSteps;
