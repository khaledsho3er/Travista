import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, Grid, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
const TravistaLoading = () => {
  // State to control loading screen visibility
  const [loading, setLoading] = useState(true);

  // Simulate data fetching or set timeout to show loading screen for at least 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 3 seconds
    }, 13000); // Adjust time as needed (3 seconds here)

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      {/* Only show loading screen when `loading` is true */}
      {loading && (
        <Link to="/account" style={{ textDecoration: "none" }}>
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
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 3,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {/* Using React Awesome Loader */}
                {/* <BallTriangle
                  color="#750046"
                  size={50}
                  speed={1} // Adjust the speed of the loader
                /> */}
                <OrbitProgress
                  color="#750046"
                  size="medium"
                  text=""
                  textColor=""
                />
                <br />
                <Typography
                  component="h3"
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1.02rem",
                  }}
                >
                  Hang up a bit...
                </Typography>
                <Typography
                  component="p"
                  sx={{ mb: 2, fontSize: "0.875rem", textAlign: "center" }}
                >
                  We are setting everything up for you
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Link>
      )}
    </>
  );
};

export default TravistaLoading;
