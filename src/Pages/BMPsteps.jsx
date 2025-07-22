import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import StepTwo from "../components/BMPsteps/stepTwo";
import StepOne from "../components/BMPsteps/stepOne";
import StepThree from "../components/BMPsteps/stepThree";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../components/SuccessDialog";
import { motion, AnimatePresence } from "framer-motion";

function BuildMyPackageSteps() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Step 1 data
  const [tripType, setTripType] = useState("");

  // Step 2 data
  const [departureCountry, setDepartureCountry] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [budget, setBudget] = useState(2390);
  const [currency, setCurrency] = useState("EUR");
  const [travelDate, setTravelDate] = useState("");
  const [flexibility, setFlexibility] = useState(2);
  const [nights, setNights] = useState(1);

  // Step 3 data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!tripType) {
      setError("Please select a trip type");
      return;
    }

    if (!departureCountry || !departureCity) {
      setError("Please select departure country and city");
      return;
    }

    if (!travelDate) {
      setError("Please select a travel date");
      return;
    }

    if (!firstName || !lastName || !email || !phoneNumber) {
      setError("Please fill in all personal information fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = {
        type: tripType,
        departureCountry,
        departureCity,
        numberOfTravellers: travellers,
        budgetPerPerson: budget,
        travelDate: new Date(travelDate),
        flexibility,
        numberOfNights: nights,
        firstName,
        lastName,
        email,
        phoneNumber: `${countryCode}${phoneNumber}`,
        currency, // 👈 Add this line
      };

      // Submit the form data to the API
      const response = await axios.post(
        "https://api.travistasl.com/api/build-packages",
        formData
      );

      console.log("Form submitted successfully:", response.data);

      // Show success dialog instead of navigating
      setShowSuccessDialog(true);

      // Reset form fields
      setTripType("");
      setDepartureCountry("");
      setDepartureCity("");
      setTravellers(1);
      setBudget("");
      setTravelDate("");
      setFlexibility("");
      setNights(1);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setCountryCode("+1");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    // Navigate to home page after closing dialog
    navigate("/");
  };

  // const validateForm = () => {
  //   if (!tripType) {
  //     setError("Please select a trip type");
  //     return false;
  //   }

  //   if (!departureCountry || !departureCity) {
  //     setError("Please select departure country and city");
  //     return false;
  //   }

  //   if (!travelDate) {
  //     setError("Please select a travel date");
  //     return false;
  //   }

  //   if (!firstName || !lastName || !email || !phoneNumber) {
  //     setError("Please fill in all personal information fields");
  //     return false;
  //   }

  //   return true;
  // };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne tripType={tripType} setTripType={setTripType} />;
      case 2:
        return (
          <StepTwo
            departureCountry={departureCountry}
            setDepartureCountry={setDepartureCountry}
            departureCity={departureCity}
            setDepartureCity={setDepartureCity}
            travellers={travellers}
            setTravellers={setTravellers}
            budget={budget}
            setBudget={setBudget}
            currency={currency}
            setCurrency={setCurrency}
            travelDate={travelDate}
            setTravelDate={setTravelDate}
            flexibility={flexibility}
            setFlexibility={setFlexibility}
            nights={nights}
            setNights={setNights}
          />
        );
      case 3:
        return (
          <StepThree
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Navbar />
      <main className="BMP-steps-main">
        <section
          className="BMP-steps-hero"
          style={{
            display: "flex",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            marginRight: "calc(-50vw + 50%)",
          }}
        >
          <div
            className="BMP-steps-hero-content-container"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              className="BMP-steps-hero-image-left"
              sx={{
                flex: "0 0 20vw",
                height: "40vh",
                overflow: "hidden",
                borderRadius: 0,
              }}
            >
              <img
                src="assets/zinzibar.jpg"
                alt="Hero 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
            <Box
              className="BMP-steps-content"
              sx={{ flex: "1 1 40vw", minWidth: 0 }}
            >
              {/* Animated Step Counter */}
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {currentStep}
                  </motion.span>
                </AnimatePresence>
                <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  {" "}
                  of 3
                </span>
              </Box>
              {/* Animated Step Content */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
              {error && (
                <Box
                  className="error-message"
                  sx={{ color: "red", mt: 2, textAlign: "center" }}
                >
                  {error}
                </Box>
              )}
            </Box>
            <Box
              className="BMP-steps-hero-image-right"
              sx={{
                flex: "0 0 20vw",
                height: "40vh",
                overflow: "hidden",
                borderRadius: 0,
              }}
            >
              <img
                src="assets/zinzibar.jpg"
                alt="Hero 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </div>
        </section>
      </main>
      <Box className="steps-Actions-Buttons">
        <button
          className="steps-action-button steps-back-button"
          onClick={handleBack}
          disabled={currentStep === 1 || loading}
        >
          Go back
        </button>
        <button
          className="steps-action-button steps-next-button"
          onClick={currentStep === 3 ? handleSubmit : handleNext}
          disabled={loading}
        >
          {loading ? "Processing..." : currentStep === 3 ? "Finish" : "Next"}
        </button>
      </Box>

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        formType="buildPackage"
      />
    </Box>
  );
}

export default BuildMyPackageSteps;
