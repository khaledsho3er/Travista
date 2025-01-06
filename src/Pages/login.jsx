import React from "react";
import {
  Button,
  TextField,
  Link,
  Typography,
  Box,
  Paper,
  Grid,
  CssBaseline,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const TravistaSignIn = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoading = () => {
    navigate("/loading"); // Navigate to Explore Packages page
  };
  return (
    <>
      <Navbar />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        {/* Image Section */}
        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          sx={{
            backgroundImage: "url(/assets/Image.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "30vh", sm: "100vh" }, // Smaller height on mobile
          }}
        ></Grid>

        {/* Form Section */}
        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" }, // Center on mobile
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              my: { xs: 4, sm: 8 },
              mx: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {/* Title */}
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: { xs: "1.8rem", sm: "2rem" },
                mb: 2,
              }}
            >
              Sign In
            </Typography>

            {/* Subtitle */}
            <Typography
              component="p"
              sx={{
                mb: 4,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                textAlign: "center",
              }}
            >
              Manage your booked trips, tours, and profile information.
            </Typography>

            {/* Form */}
            <Box
              component="form"
              sx={{
                mt: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                margin="normal"
                required
                sx={{
                  width: { xs: "90%", sm: "50%" }, // Full width on mobile
                  borderRadius: "50px",
                }}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                size="small"
                margin="normal"
                required
                sx={{
                  width: { xs: "90%", sm: "50%" },
                  borderRadius: "50px",
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: { xs: "90%", sm: "50%" },
                  borderRadius: "50px",
                  background: "#142328",
                }} // Oval shape to match the input fields
                onClick={handleLoading}
              >
                Sign In
              </Button>
              {/* <Grid container justifyContent="center" sx={{ width: "100%" }}>
                <Grid item xs textAlign="center">
                  <Link href="#" variant="body2" color="#777777">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" color="#266EF1">
                    Create Account
                  </Link>
                </Grid>
              </Grid> */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontSize: "0.75rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Link href="#" variant="body2" color="#777777">
                  Forgot Password?
                </Link>
                <Link href="/signup" variant="body2" color="#266EF1">
                  Create Account
                </Link>
              </Box>
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontSize: "0.75rem",
                }}
              >
                By signing in, I have read, and I understand and agree to the
                Travista Terms <br /> of Use and Data Privacy Notice
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TravistaSignIn;
