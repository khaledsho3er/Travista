import React from "react";
import { Typography, Box, Paper, Grid, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TravistaLoading = ({ showNavbar = true }) => {
  return (
    <>
      {showNavbar && <Navbar />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: "url(/assets/Image.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Grid>
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
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
            <AiOutlineLoading3Quarters
              size={50}
              color="#750046"
              className="loading-icon"
            />
            <style>
              {`.loading-icon {
                  animation: rotate 2s linear infinite;
              }
              @keyframes rotate {
                  0% {
                      transform: rotate(0deg);
                  }
                  100% {
                      transform: rotate(360deg);
                  }
              }`}
            </style>
            <br></br>
            <Typography
              component="h3"
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.02rem",
              }}
            >
              Hang on a bit...
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
    </>
  );
};

export default TravistaLoading;
