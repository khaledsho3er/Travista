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

const TravistaSignIn = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Sign In
          </Typography>
          <Typography
            component="p"
            sx={{ mb: 2, fontSize: "0.875rem", textAlign: "center" }}
          >
            Manage your booked trips, tours and profile information.
          </Typography>
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
                width: "50%", // Adjust width to your preference
                borderRadius: "50px", // High value for oval shape
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
                width: "50%", // Adjust width to your preference
                borderRadius: "50px", // High value for oval shape
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
              sx={{ mt: 3, mb: 2, width: "50%", borderRadius: "50px" }} // Oval shape to match the input fields
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Create Account
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              By signing in, I have read, and I understand and agree to the
              Travista Terms of Use and Data Privacy Notice
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TravistaSignIn;
