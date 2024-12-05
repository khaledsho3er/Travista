import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Slide,
  useMediaQuery,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BsXCircle } from "react-icons/bs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function PersonalInfo() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [countryCode, setCountryCode] = React.useState("+20");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleAdultsChange = (delta) => {
    setAdults((prev) => Math.max(0, prev + delta));
  };

  const handleChildrenChange = (delta) => {
    setChildren((prev) => Math.max(0, prev + delta));
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{
          maxWidth: "100%",
          height: "50rem",
          margin: "40px auto",
          backgroundColor: "#ffffff",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          maxHeight: "700px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          position: "relative",
          bottom: 0,
          zIndex: 1000,

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
            src="/assets/prague.jpg"
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
            height: "auto",
            borderTopRightRadius: "20px",
          }}
        >          <Link to="/packages">

          <IconButton
            sx={{ position: "absolute", top: 16, right: 16 }}
            aria-label="close"
            onClick={() => setOpen(false)}
          >
            <BsXCircle />
          </IconButton>
          </Link>
          <Link to="/pp">
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
          <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 1 }}>
            <hr></hr>
          </Box>
          <hr style={{ margin: "0px 0 30px 0px " }}></hr>

          <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 1 }}>
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
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
}

export default PersonalInfo;
