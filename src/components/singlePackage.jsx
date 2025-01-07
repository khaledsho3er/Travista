import React from "react";
import { Box, Slide } from "@mui/material";
import ComponentOne from "./component/componentOne";
import ComponentTwo from "./component/componentTwo";
import ComponentThree from "./component/componentThree";
import HotelAccommodation from "./component/hotelAccommodation";
import FlightReservation from "./component/flightReservation"; // Import your new component

function SinglePackage({ packageDetails, onClose }) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedHotel, setSelectedHotel] = React.useState(null);
  const [hotels, setHotels] = React.useState(packageDetails.hotels || []);
  const [flights, setFlights] = React.useState(packageDetails.flights || []); // New state for flight data

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFinish = () => {
    onClose(); // Close the slide-up modal when finished
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        sx={{
          width: "100%",
          margin: "40px auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxHeight: "800px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "55%",
            height: "80%",
            zIndex: 9999,
          }}
        >
          <img
            src={packageDetails.image}
            alt="Trip location"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {currentStep === 1 ? (
          <ComponentOne
            packageDetails={packageDetails}
            setOpen={onClose}
            handleNext={handleNext}
          />
        ) : currentStep === 2 ? (
          <HotelAccommodation
            hotels={hotels}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            setOpen={onClose}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        ) : currentStep === 3 ? (
          <ComponentTwo
            hotels={hotels} // Pass hotels array here
            setOpen={onClose}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        ) : currentStep === 4 ? (
          <FlightReservation
            flights={flights}
            setOpen={onClose}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        ) : currentStep === 5 ? (
          <ComponentThree
            setOpen={onClose}
            handleBack={handleBack}
            handleFinish={handleFinish}
          />
        ) : null}
      </Box>
    </Slide>
  );
}

export default SinglePackage;
