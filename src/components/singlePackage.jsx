import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Tab,
  Tabs,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BedIcon from "@mui/icons-material/Bed";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaCheck } from "react-icons/fa";
import ProgramPopup from "./dailyProgram"; // Import the new component

function SinglePackage({ tour, onClose }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [countryCode, setCountryCode] = useState("+1");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showProgramPopup, setShowProgramPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1", // Initialize here
    adults: 1, // Initialize here
    children: 0, // Initialize here
    notes: "",
    roomType: "", // Initialize here (removed selectedRoom state)
    packageId: tour._id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Format the package data for display
  const packageDetails = {
    type: tour?.type || "Package",
    title: tour?.destinations?.join(", ") || "",
    duration: `${tour?.totalDays || 0} Days, ${tour?.totalNights || 0} Nights`,
    flight: tour?.flights?.length > 0 ? "Included" : "Not specified",
    Accommodation: tour?.hotels?.length > 0 ? "Included" : "Not specified",
    Transportation: tour?.hotels ? "Included" : "Not included",
    Program: tour?.tour && tour.tour.length > 0 ? "Included" : "Not included",
    Inclusions:
      tour?.includes?.map((item) => ({
        title: item.split(":")[0] || "Inclusion",
        description: item.split(":")[1] || "",
      })) || [],
    Exclusions:
      tour?.excludes?.map((item) => ({
        title: item.split(":")[0] || "Exclusion",
        description: item.split(":")[1] || "",
      })) || [],
    generalNotes:
      tour?.generalNotes?.map((note) => ({
        description: note,
      })) || [],
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  const handleFinish = (e) => {
    handleSubmit();
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRoomChange = (room) => setSelectedRoom(room);
  const handleAdultsChange = (value) =>
    setAdults((prev) => Math.max(0, prev + value));
  const handleChildrenChange = (value) =>
    setChildren((prev) => Math.max(0, prev + value));
  const handleCountryCodeChange = (event) => setCountryCode(event.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://158.220.96.121/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "40%",
          padding: isSmallScreen ? "16px" : "32px",
          position: "relative",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Application Submitted Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Thank you for applying for our {tour.packageName} package.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#142328",
              "&:hover": {
                backgroundColor: "#0f1c24",
              },
            }}
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    );
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            {packageDetails.Inclusions.map((item, index) => (
              <Box
                display="flex"
                alignItems="flex-start"
                mb={"10px"}
                key={index}
              >
                <FaCheck
                  color="#750046"
                  size={16}
                  style={{ marginRight: "8px", marginTop: "4px" }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      case 1:
        return (
          <Box>
            {packageDetails.Exclusions.map((item, index) => (
              <Box
                display="flex"
                alignItems="flex-start"
                mb={"10px"}
                key={index}
              >
                <FaCheck
                  color="#750046"
                  size={16}
                  style={{ marginRight: "8px", marginTop: "4px" }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      case 2:
        return (
          <Box>
            {packageDetails.generalNotes.map((item, index) => (
              <Box
                display="flex"
                alignItems="flex-start"
                mb={"10px"}
                key={index}
              >
                <FaCheck
                  color="#750046"
                  size={16}
                  style={{ marginRight: "8px", marginTop: "4px" }}
                />
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  // Hotel data - you might want to get this from the tour prop if available
  const hotels = [
    {
      name: tour?.hotels?.[0]?.hotelName || "Standard Accommodation",
      image: tour?.packagePicture || "default-hotel.jpg",
      MealPlan: tour?.mealPlan || "Half Board",
      price: `${tour?.hotels[0].single || "0"} ${
        tour?.packagePrice?.currency || ""
      }`,
      nights: tour?.totalNights || 0,
      city: tour?.destinations?.[0] || "Destination",
    },
  ];

  const HotelAccommodation = ({ hotels, selectedHotel, setSelectedHotel }) => {
    return (
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "40%",
          padding: isSmallScreen ? "16px" : "32px",
          position: "relative",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          sx={{ position: "absolute", top: 16, left: 16 }}
          aria-label="return"
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Choose Your Hotel Accommodation
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto",
              maxHeight: "500px",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#750046",
                borderRadius: "3px",
              },
            }}
          >
            {hotels.map((hotel, index) => (
              <Box
                key={index}
                onClick={() => setSelectedHotel(hotel.name)}
                sx={{
                  p: 2,
                  border: `2px solid ${
                    selectedHotel === hotel.name ? "#750046" : "#ddd"
                  }`,
                  borderRadius: "12px",
                  backgroundColor:
                    selectedHotel === hotel.name ? "#f9f9f9" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#750046",
                  },
                }}
              >
                <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#750046",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        City
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#750046",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#750046",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        Nights
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#750046",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        Price per Person
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          color: "#750046",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        Meal Plan
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {hotel.city}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {hotel.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {hotel.nights}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {hotel.price}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {hotel.MealPlan}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            padding: "12px",
            borderRadius: "25px",
            fontWeight: "bold",
            textTransform: "none",
            marginTop: "20px",
            backgroundColor: "#0f1c24",
            "&:hover": {
              backgroundColor: "#fff",
              border: "2px solid #0f1c24",
              color: "#0f1c24",
            },
          }}
          onClick={handleNext}
        >
          Book Now
        </Button>
      </Box>
    );
  };
  const flights = [
    {
      airline: tour?.flights.airline || "Egypt Air",
      FlightDate:
        new Date(tour?.flights.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) || "1/1/2025",
      departureDate:
        new Date(tour?.flights.departureDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) || "1/1/2025",
      arrivalDate:
        new Date(tour?.flights.arrivalDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) || "1/1/2025",
      departureTime:
        new Date(tour?.flights.departureTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }) || "12:00",
      arrivalTime:
        new Date(tour?.flights.arrivalTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }) || "15:00",
      FlightFrom: tour?.flights.from || "Cairo",
      FlightTo: tour?.flights.to || "London",
    },
  ];
  const FlightSchedule = ({ flights, selectedFlight, setSelectedFlight }) => {
    return (
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "40%",
          padding: isSmallScreen ? "16px" : "32px",
          position: "relative",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          sx={{ position: "absolute", top: 16, left: 16 }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Flight Schedule
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto",
              maxHeight: "500px",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#750046",
                borderRadius: "3px",
              },
            }}
          >
            {flights.map((flight, index) => (
              <Box
                key={index}
                onClick={() => setSelectedFlight(index)}
                sx={{
                  p: 2,
                  border: `2px solid ${
                    selectedFlight === index ? "#750046" : "#ddd"
                  }`,
                  borderRadius: "12px",
                  backgroundColor:
                    selectedFlight === index ? "#f9f9f9" : "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "#750046",
                  },
                }}
              >
                <Table sx={{ width: "100%", borderCollapse: "collapse" }}>
                  <TableHead>
                    <TableRow>
                      {["Airline", "Date", "Route", "Depart", "Arrival"].map(
                        (header) => (
                          <TableCell
                            key={header}
                            sx={{
                              fontWeight: "bold",
                              color: "#750046",
                              borderBottom: "2px solid #ddd",
                              textAlign: "left",
                            }}
                          >
                            {header}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {flight.airline}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {flight.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {flight.from}/{flight.to}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        {flight.departureDate} / {flight.departureTime}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #ddd",
                          textAlign: "left",
                          color: flight.isNextDay ? "red" : "inherit",
                          fontStyle: flight.isNextDay ? "italic" : "normal",
                        }}
                      >
                        {flight.arrivalDate} / {flight.arrivalTime}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            padding: "12px",
            borderRadius: "25px",
            fontWeight: "bold",
            textTransform: "none",
            marginTop: "20px",
            backgroundColor: "#0f1c24",
            "&:hover": {
              backgroundColor: "#fff",
              border: "2px solid #0f1c24",
              color: "#0f1c24",
            },
          }}
          onClick={handleNext}
        >
          Confirm Flight
        </Button>
      </Box>
    );
  };
  const ComponentOne = () => (
    <Box sx={{ width: "40%", padding: "32px", position: "relative" }}>
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <Box display="flex" alignItems="center" gap="8px">
        <div
          style={{
            backgroundColor: "#ffffff",
            color: "#00695c",
            fontSize: "0.8rem",
            borderRadius: "3px",
            padding: "4px 12px",
            border: "2px solid #00695c",
          }}
        >
          {packageDetails.type}
        </div>
      </Box>

      <Typography variant="h4" fontWeight="bold" mt={2}>
        {packageDetails.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mt={1}>
        {packageDetails.duration}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        mt={1}
        mb={2}
        onClick={() => setShowProgramPopup(true)}
        sx={{
          cursor: "pointer",
          textDecoration: "underline",
          "&:hover": {
            color: "#750046",
          },
        }}
      >
        {" "}
        Read more +
      </Typography>

      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Flights
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.flight}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Accommodation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.Accommodation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Transportation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.Transportation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Program
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.Program}
          </Typography>
        </Grid>
      </Grid>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mt: 3,
          mb: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#750046",
          },
          "& .MuiTab-root": {
            color: "#757575",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#750046",
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="Inclusion" />
        <Tab label="Exclusion" />
        <Tab label="General Notes" />
      </Tabs>

      {renderTabContent()}

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "12px",
          borderRadius: "25px",
          fontWeight: "bold",
          textTransform: "none",
          marginBottom: "15px",
          marginTop: "1px",
          backgroundColor: "#0f1c24",
          "&:hover": {
            backgroundColor: "#fff",
            border: "2px solid #0f1c24",
            color: "#0f1c24",
          },
        }}
        onClick={handleNext}
      >
        Book Now
      </Button>
    </Box>
  );

  const ComponentTwo = () => (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "40%",
        padding: isSmallScreen ? "16px" : "32px",
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        aria-label="return"
        onClick={handleBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        fontWeight="bold"
        mt={3}
      >
        Choose Your Preferences
      </Typography>
      <Typography variant="subtitle2" mt={1} color="#777777">
        Select your preferred travel date and accommodation type...
      </Typography>
      <Typography variant="body2" color="#777777" mt={4} mb={0}>
        Preferred date
      </Typography>
      <Grid container spacing={2} mb={2}>
        {[
          new Date(tour?.departureDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        ].map((date) => (
          <Grid item xs={isSmallScreen ? 12 : 6} key={date}>
            <Typography
              sx={{
                padding: "10px 0px",
                margin: "3rem 0rem",
                fontWeight: "bold",
                height: "50px",
              }}
            >
              {date}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" color="#777777" mb={2}>
        Select room size
      </Typography>
      <Box sx={{ mb: 4 }}>
        {[
          {
            label: "Single Room",
            price: `${tour?.hotels[0]?.single || "0"} ${
              tour?.packagePrice?.currency || ""
            }`,
          },
          {
            label: "Double Room",
            price: `${Math.round(tour?.hotels[0]?.double || "0") || "0"} ${
              tour?.packagePrice?.currency || ""
            }`,
          },
          {
            label: "Triple Room",
            price: `${Math.round(tour?.hotels[0]?.triple || "0") || "0"} ${
              tour?.packagePrice?.currency || ""
            }`,
          },
        ].map((room, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              border: 2,
              borderRadius: 2,
              mb: 1,
              cursor: "pointer",
              borderColor: selectedRoom === room.label ? "#86205d" : "#ddd",
              bgcolor: selectedRoom === room.label ? "#ffffff" : "transparent",
              ":hover": {
                borderColor: "#86205d",
                backgroundColor: "#86205d",
                color: "#ffffff",
              },
            }}
            onClick={() => handleRoomChange(room.label)}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BedIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                {room.label}
                <br></br>
                <Typography variant="body2" color="textSecondary">
                  {room.price}
                </Typography>
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#142328",
          width: isSmallScreen ? "100%" : "30%",
          padding: "12px",
          borderRadius: "25px",
          fontWeight: "bold",
          textTransform: "none",
          color: "#ffffff",
          ml: "auto",
          float: "right",
          "&:hover": {
            backgroundColor: "#fff",
            border: "2px solid #0f1c24",
            color: "#0f1c24",
          },
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );

  const ComponentThree = () => (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "40%",
        padding: isSmallScreen ? "16px" : "32px",
        position: "relative",
        height: "auto",
        borderTopRightRadius: "20px",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        aria-label="return"
        onClick={handleBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        fontWeight="bold"
        mt={3}
      >
        Let's get personal
      </Typography>
      <Typography variant="subtitle2" mt={1} color="#777777">
        Tell us more about you
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "80%" }}
            label="First name"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "100%" }}
            label="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
        </Box>
        <TextField
          size="small"
          margin="normal"
          required
          sx={{ width: "100%", mb: 2, borderRadius: "30px" }}
          label="Email"
          name="email"
          autoComplete="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
          }}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <FormControl sx={{ minWidth: 80, mt: 2 }}>
            <Select
              size="small"
              margin="normal"
              value={formData.countryCode}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
              name="countryCode"
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            >
              <MenuItem value="+1">+1 (USA)</MenuItem>
              <MenuItem value="+20">+20 (Egypt)</MenuItem>
              <MenuItem value="+44">+44 (UK)</MenuItem>
              <MenuItem value="+61">+61 (Australia)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            margin="normal"
            required
            sx={{ flex: 1 }}
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({
                ...prev,
                [name]: value,
              }));
            }}
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
        </Box>
        <TextField
          multiline
          rows={3}
          fullWidth
          margin="normal"
          placeholder="Do you need help with Visa or have any special requests?"
          name="notes"
          value={formData.notes}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
          }}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
          }}
        />
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              color: "#777777",
              fontSize: "20px",
            }}
          >
            <Typography variant="body1" gutterBottom>
              Adults
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "4px 8px",
                width: "250px",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    adults: Math.max(1, prev.adults - 1),
                  }))
                }
                disabled={formData.adults <= 0}
                sx={{
                  backgroundColor:
                    formData.adults > 0 ? "#f0f0f0" : "transparent",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{formData.adults}</Typography>
              <IconButton
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    adults: prev.adults + 1,
                  }))
                }
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              color: "#777777",
              fontSize: "20px",
            }}
          >
            <Typography variant="body1" gutterBottom>
              Children
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "4px 8px",
                width: "250px",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    children: Math.max(0, prev.children - 1),
                  }))
                }
                disabled={formData.children <= 0}
                sx={{
                  backgroundColor:
                    formData.children > 0 ? "#f0f0f0" : "transparent",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{formData.children}</Typography>
              <IconButton
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    children: prev.children + 1,
                  }))
                }
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
      <hr style={{ margin: "0px 0 30px 0px" }} />

      <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 3 }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            {new Date(tour?.departureDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Selected Room: {selectedRoom}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {selectedRoom === "Single Room"
              ? `${Math.round(tour?.hotels[0]?.single) || "0"} ${
                  tour?.packagePrice?.currency || ""
                }`
              : selectedRoom === "Double Room"
              ? `${Math.round(tour?.hotels[0]?.double) || "0"} ${
                  tour?.packagePrice?.currency || ""
                }`
              : selectedRoom === "Triple Room"
              ? `${Math.round(tour?.hotels[0]?.triple) || "0"} ${
                  tour?.packagePrice?.currency || ""
                }`
              : `${tour?.packagePrice?.amount || "0"} ${
                  tour?.packagePrice?.currency || ""
                }`}
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            type: "submit",
            backgroundColor: "#142328",
            width: isSmallScreen ? "100%" : "30%",
            padding: "12px",
            borderRadius: "25px",
            fontWeight: "bold",
            textTransform: "none",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#0f1c24",
            },
            ml: "auto",
            float: "right",
          }}
        >
          {loading ? "Submitting..." : "Finish"}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        sx={{
          width: "100%",
          margin: "30px auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxHeight: "700px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "55%",
            zIndex: 9999,
          }}
        >
          <img
            src={`https://158.220.96.121/${tour?.packagePicture}`}
            alt={tour?.packageName || "Package"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {currentStep === 1 ? (
          <ComponentOne />
        ) : currentStep === 2 ? (
          <HotelAccommodation
            hotels={hotels}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
        ) : currentStep === 3 ? (
          <FlightSchedule
            flights={flights}
            selectedFlight={selectedFlight}
            setSelectedFlight={setSelectedFlight}
          />
        ) : currentStep === 4 ? (
          <ComponentTwo />
        ) : currentStep === 5 ? (
          <ComponentThree />
        ) : null}
        {showProgramPopup && (
          <ProgramPopup
            packageId={tour.tour}
            onClose={() => setShowProgramPopup(false)}
          />
        )}
      </Box>
    </Slide>
  );
}

export default SinglePackage;
