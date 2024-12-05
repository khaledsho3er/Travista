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

const TravistaSignUp = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Navbar />
      <CssBaseline />
      {/* Image Section */}
      <Grid
        item
        xs={12}
        sm={4}
        md={5}
        sx={{
          backgroundImage: "url(/assets/Image.png)", // Correct URL for public assets
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "30vh", sm: "100vh" }, // Reduce height on mobile
        }}
      ></Grid>

      {/* Form Section */}
      <Grid
        item
        xs={12}
        sm={8}
        md={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" }, // Center align for mobile
          padding: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: 560,
            width: "100%",
            mx: "auto",
            textAlign: "center",
            padding: 4,
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}
          >
            Create Account
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Create an account to manage your booked trips, tours, and profile
            information.
          </Typography>

          {/* Form */}
          <Box component="form" noValidate>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 2,
              }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                sx={{ width: "100%" }}
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
              label={
                <Typography
                  variant="body2"
                  textAlign="left"
                  sx={{ fontSize: "0.875rem" }}
                >
                  By creating an account, I have read, and I understand and
                  agree to, the Travista Terms of Use and Data Privacy Notice.
                </Typography>
              }
              sx={{
                alignItems: "start",
                textAlign: "left",
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
              <Typography
                component="span"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TravistaSignUp;
