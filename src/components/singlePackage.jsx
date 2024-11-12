import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FaCheck } from "react-icons/fa";

function SinglePackage() {
  const [open, setOpen] = useState(true);

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

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        sx={{
          maxWidth: "1300px",
          margin: "40px auto", // Space above the slider
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          maxHeight: "800px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
          bottom: 0,
        }}
      >
        <Box sx={{ position: "relative", width: "60%", height: "80%" }}>
          <img
            src="/assets/explore.png"
            alt="Trip location"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0
              ,
              right: 16,
              backgroundColor: "#FFFFFFFF",
              color: "#750046",
              padding: "8px 12px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <Typography variant="h6" fontWeight="bold" align="center">
              10 <br /> MAY
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              display: "flex",
              gap: "10px",
            }}
          >
            <IconButton>
              <ArrowBackIcon sx={{ color: "white", fontSize: "32px" }} />
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
            }}
          >
            <IconButton>
              <ArrowForwardIcon sx={{ color: "white", fontSize: "32px" }} />
            </IconButton>
          </Box>
        </Box>

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
                border:"2px",
                borderColor:"#00695c",
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
              { title: "Accommodation", description: "3 nights in Vienna, 3 nights in Prague, and 3 nights in Munich" },
              { title: "International flights", description: "International direct round trip economy ticket by Egypt Air" },
              { title: "Internal flights", description: "Internal flight ticket from Amsterdam to Barcelona" },
              { title: "Local Transportation", description: "Transportation provided within all cities" },
            ].map((item, index) => (
              <Box display="flex" alignItems="flex-start" mb={2} key={index}>
                <FaCheck color="#750046" size={16} style={{ marginRight: "8px", marginTop: "4px" }} />
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
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}

export default SinglePackage;

