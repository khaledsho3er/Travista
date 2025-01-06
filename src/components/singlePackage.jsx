import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BsXCircle } from "react-icons/bs";
import BedIcon from "@mui/icons-material/Bed";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaCheck } from "react-icons/fa";
function SinglePackage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); // Step state
  const [selectedRoom, setSelectedRoom] = useState(""); // Room selection state
  const [selectedDate, setSelectedDate] = useState(""); // Date selection state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [countryCode, setCountryCode] = useState("+1");
  const details = {
    type: "Ground Trip",
    title: "Paris, Amsterdam, Barcelona",
    duration: "9 Days, 8 Nights",
    flight: "Egypt Air",
    Accommodation: "4 Stars",
    Transportation: "Included",
    Program: "Included",
    Inclusions: [
      "Accommodation",
      "International flights",
      "Internal flights",
      "Local Transportation",
    ],
  };
  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };
  const handleFinish = () => {
    navigate("/");
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleRoomChange = (room) => setSelectedRoom(room);
  const handleDateChange = (date) => setSelectedDate(date);
  const handleAdultsChange = (value) =>
    setAdults((prev) => Math.max(0, prev + value));
  const handleChildrenChange = (value) =>
    setChildren((prev) => Math.max(0, prev + value));
  const handleCountryCodeChange = (event) => setCountryCode(event.target.value);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const ComponentOne = () => (
    <Box sx={{ width: "40%", padding: "32px", position: "relative" }}>
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <Box display="flex" alignItems="center" gap="8px">
        <div
          variant="contained"
          sx={{
            backgroundColor: "#ffffff",
            color: "#00695c",
            fontSize: "0.8rem",
            borderRadius: "3px",
            textTransform: "none",
            padding: "4px 12px",
            border: "2px",
            borderColor: "#00695c",
          }}
        >
          {details.type}
        </div>
      </Box>

      <Typography variant="h4" fontWeight="bold" mt={2}>
        {details.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mt={1}>
        {details.duration}
      </Typography>
      <Typography variant="body2" color="textSecondary" mt={1} mb={2}>
        Read more +
      </Typography>

      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Flights
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {details.flight}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Accommodation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {details.Accommodation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Transportation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {details.Transportation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Program
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {details.Program}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" fontWeight="bold" mt={2}>
        Inclusions
      </Typography>
      <Box mt={1}>
        {[
          {
            title: "Accommodation",
            description:
              "3 nights in Vienna, 3 nights in Prague, and 3 nights in Munich",
          },
          {
            title: "International flights",
            description:
              "International direct round trip economy ticket by Egypt Air",
          },
          {
            title: "Internal flights",
            description: "Internal flight ticket from Amsterdam to Barcelona",
          },
          {
            title: "Local Transportation",
            description: "Transportation provided within all cities",
          },
        ].map((item, index) => (
          <Box display="flex" alignItems="flex-start" mb={2} key={index}>
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

  const ComponentTwo = () => (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "40%",
        padding: isSmallScreen ? "16px" : "32px",
        position: "relative",
      }}
    >
      <Link to="/packages">
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          aria-label="close"
          onClick={() => setOpen(false)}
        >
          <BsXCircle />
        </IconButton>
      </Link>

      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        aria-label="return"
        onClick={handleBack} // Use the handleBack function to navigate to the previous step
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
      <Typography variant="body2" color="#777777" mt={4} mb={2}>
        Select preferred date
      </Typography>
      <Grid container spacing={2} mb={7}>
        {["10th May 2024 - 19th May 2024"].map((date) => (
          <Grid item xs={isSmallScreen ? 12 : 6} key={date}>
            <Typography
              variant="outlined"
              onClick={() => handleDateChange(date)}
              sx={{
                textTransform: "none",
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
          { label: "Single Room", price: "€3,490" },
          { label: "Double Room", price: "€2,490" },
          { label: "Triple Room", price: "€2,390" },
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
              bgcolor:
                (selectedRoom === room.label) & room.price
                  ? "#ffffff"
                  : "transparent",
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
        onClick={() => setOpen(false)}
      >
        <BsXCircle />
      </IconButton>

      <Link to="/packages">
        <IconButton
          sx={{ position: "absolute", top: 16, left: 16 }}
          aria-label="return"
          onClick={handleBack} // Use the handleBack function to navigate to the previous step
        >
          <ArrowBackIcon />
        </IconButton>
      </Link>
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
      <Box component="form" noValidate>
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "80%" }}
            label="First name"
            name="firstName"
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
              value={countryCode}
              onChange={handleCountryCodeChange}
              mt
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
            InputProps={{
              style: {
                borderRadius: "10px",
              },
            }}
          />
        </Box>
        <textarea
          placeholder="Do you need help in Visa....?"
          class="textarea-input"
        ></textarea>
        {/* Counters for Adults and Children */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Adults Counter */}
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
                onClick={() => handleAdultsChange(-1)}
                disabled={adults <= 0}
                sx={{
                  backgroundColor: adults > 0 ? "#f0f0f0" : "transparent",
                  borderRadius: "50%",
                  width: "30px", // Set button width
                  height: "30px", // Set button height
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{adults}</Typography>
              <IconButton
                onClick={() => handleAdultsChange(1)}
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                  width: "30px", // Set button width
                  height: "30px", // Set button height
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Children Counter */}
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
                width: "250px", // Set width to make it uniform
                justifyContent: "space-between",
              }}
            >
              <IconButton
                onClick={() => handleChildrenChange(-1)}
                disabled={children <= 0}
                sx={{
                  backgroundColor: children > 0 ? "#f0f0f0" : "transparent",
                  borderRadius: "50%",
                  width: "30px", // Set button width
                  height: "30px", // Set button height
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography>{children}</Typography>
              <IconButton
                onClick={() => handleChildrenChange(1)}
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
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 3 }}>
        <hr></hr>
      </Box>
      <hr style={{ margin: "0px 0 30px 0px " }}></hr>

      <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 3 }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            10th May - 19th May
          </Typography>
          <Typography variant="body1" color="textPrimary">
            €2,390
          </Typography>
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
            ":hover": {
              backgroundColor: "#0f1c24",
            },
            ml: "auto",
            float: "right",
          }}
          onClick={handleFinish}
        >
          Next
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
          margin: "40px auto",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxHeight: "800px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* Image on the left */}
        <Box
          sx={{
            position: "relative",
            width: "60%",
            height: "80%",
            zIndex: 9999,
          }}
        >
          <img
            src="/assets/explore.png"
            alt="Trip location"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* Dynamic Component Rendering */}
        {currentStep === 1 ? (
          <ComponentOne />
        ) : currentStep === 2 ? (
          <ComponentTwo />
        ) : (
          <ComponentThree />
        )}
      </Box>
    </Slide>
  );
}

export default SinglePackage;
