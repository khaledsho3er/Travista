import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BsXCircle } from "react-icons/bs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BedIcon from "@mui/icons-material/Bed";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PreferencePackage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleNextPI = () => {
    navigate("/pi"); // Navigate to Explore Packages page
  };
  const [open, setOpen] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleRoomChange = (room) => {
    setSelectedRoom(room);
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit >
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{
          maxWidth: "100%",
          margin: "70px auto",
          backgroundColor: "#ffffff",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          maxHeight: "700px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
          bottom: 0,
          height:"100%"
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isSmallScreen ? "100%" : "60%",
            height: isSmallScreen ? "200px" : "auto",
          }}
        >
          <img
            src="/assets/preferenceImage.png"
            alt="Trip location"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              display: "flex",
              gap: "10px",
              maxHeight: "700px",
              overflowY: "auto",
              backgroundColor: "#eceee9",
              borderRadius: "25px",
            }}
          >
            <IconButton>
              <ArrowBackIcon sx={{ color: "black", fontSize: "32px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
              display: "flex",
              gap: "10px",
              backgroundColor: "#eceee9",
              borderRadius: "25px",
            }}
          >
            <IconButton>
              <ArrowForwardIcon sx={{ color: "black", fontSize: "32px" }} />
            </IconButton>
          </Box>
        </Box>

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
          <Link to="/singlePackage">

          <IconButton
            sx={{ position: "absolute", top: 16, left: 16 }}
            aria-label="return"
            onClick={() => setOpen(false)}
          >
            <ArrowBackIcon />
          </IconButton>
          </Link>
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
            {[
              "10th May 2024 - 19th May 2024",
            ].map((date) => (
              <Grid item xs={isSmallScreen ? 12 : 6} key={date}>
                <Typography
                  variant="outlined"
                  onClick={() => handleDateChange(date)}
                  sx={{
                    textTransform: "none",
                    padding: "10px 0px",
                    margin:"3rem 0rem" ,
                    fontWeight: "bold",
                    height: "50px",                    
                  }}
                >
                  {date}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" color="#777777"  mb={2}>
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
              ":hover": {
                backgroundColor: "#0f1c24",
              },
              ml: "auto",
              float: "right",
            }}
            onClick={handleNextPI}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}

export default PreferencePackage;
