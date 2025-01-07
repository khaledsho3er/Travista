// components/ComponentTwo.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BedIcon from "@mui/icons-material/Bed";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ComponentTwo({ hotels, setOpen, handleBack, handleNext }) {
  const [selectedRoom, setSelectedRoom] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRoomChange = (room) => setSelectedRoom(room);
  const roomPrices = hotels.length > 0 ? hotels[0].price : {};

  return (
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
          <CloseIcon />
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
        mb={3}
      >
        Choose Your Preferences
      </Typography>
      {/*<Typography variant="subtitle2" mt={1} color="#777777">
        Select your preferred travel date and accommodation type...
      </Typography>
       <Typography variant="body2" color="#777777" mt={4} mb={2}>
        Preferred date
      </Typography> */}
      {/* <Grid container spacing={2} mb={7}>
        {.map((date) => (
          <Grid item xs={isSmallScreen ? 12 : 6} key={date}>
            <Typography
              variant="outlined"
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
      </Grid> */}

      <Typography variant="body2" color="#777777" mb={2}>
        Select room size
      </Typography>
      <Box sx={{ mb: 4 }}>
        {[
          { label: "Single Room", price: roomPrices.singleRoom || "N/A" },
          { label: "Double Room", price: roomPrices.doubleRoom || "N/A" },
          { label: "Triple Room", price: roomPrices.tripleRoom || "N/A" },
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
}
export default ComponentTwo;
