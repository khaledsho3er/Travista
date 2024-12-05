import React from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  CssBaseline,
  FormControlLabel,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const TravistaSignUp = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Navbar />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          backgroundImage: "url(/assets/Image.png)", // Corrected URL for public assets
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Box sx={{ maxWidth: 560, mx: "auto", textAlign: "center", padding: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Create an account to manage your booked trips, tours, and profile
          information.
        </Typography>
        <Box component="form" noValidate>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              size="small"
              margin="normal"
              required
              sx={{ width: "100%", borderRadius: "50px" }}
              label="First name"
              name="firstName"
            />
            <TextField
              size="small"
              margin="normal"
              required
              sx={{ width: "100%" }}
              label="Last name"
              name="lastName"
            />
          </Box>
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "100%", mb: 2 }}
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "100%", mb: 2 }}
            label="Phone number"
            name="phone"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+20</InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "100%", mb: 2 }}
            label="Password"
            name="password"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: "100%", mb: 2 }}
            label="Confirm password"
            name="confirmPassword"
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            required
            control={<Checkbox color="primary" />}
            label="By creating an account, I have read, and I understand and agree to, the Travista Terms of Use and Data Privacy Notice."
            sx={{
              alignItems: "start",
              textAlign: "left",
              fontSize: "0.875rem",
              mb: 2,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              height: "48px",
              borderRadius: "24px",
              backgroundColor: "#333",
              mt: 2,
            }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Sign In
            </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default TravistaSignUp;
