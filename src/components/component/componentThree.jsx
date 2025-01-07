import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ComponentThree({ setOpen, handleBack, handleFinish }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [countryCode, setCountryCode] = useState("+1");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAdultsChange = (value) =>
    setAdults((prev) => Math.max(0, prev + value));
  const handleChildrenChange = (value) =>
    setChildren((prev) => Math.max(0, prev + value));
  const handleCountryCodeChange = (event) => setCountryCode(event.target.value);

  return (
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
        <CloseIcon />
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
          Finish
        </Button>
      </Box>
    </Box>
  );
}

export default ComponentThree;
