import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SinglePackage from "../components/singlePackage"; // Your component
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar";

function PackagesTours() {
  const [filter, setFilter] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const tours = [
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Zurich, Paris, Rome, Florence",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Zurich, Paris, Rome, Florence",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
    },
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePackageClick = (tour) => {
    setSelectedPackage(tour); // Set the clicked package data
  };

  const filteredTours = filter
    ? tours.filter((tour) =>
        tour.name.toLowerCase().includes(filter.toLowerCase())
      )
    : tours;

  return (
    <Box className="packages-page">
      <Navbar />

      <Box className="hero">
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          className="overlay"
        >
          <Typography variant="h2" color="white" fontWeight={800}>
            Packages & Tours
          </Typography>
          <Typography variant="body1" color="white">
            Experience breathtaking destinations and unforgettable adventures
            with our exclusive travel packages and immersive guided tours
            worldwide.
          </Typography>
        </Box>
      </Box>

      <div className="packages-tours-body">
        <Box className="packages-tours">
          <Box sx={{ display: "flex", gap: "10px", padding: "20px 0" }}>
            <Select
              value={filter}
              onChange={handleFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Select a filter" }}
            >
              <MenuItem value="" disabled>
                Filter by
              </MenuItem>
              <MenuItem value="Venice">Venice</MenuItem>
              <MenuItem value="Barcelona">Barcelona</MenuItem>
              <MenuItem value="Prague">Prague</MenuItem>
              <MenuItem value="Zurich">Zurich</MenuItem>
              <MenuItem value="Paris">Paris</MenuItem>
              <MenuItem value="Rome">Rome</MenuItem>
              <MenuItem value="Florence">Florence</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={3}>
            {filteredTours.map((tour, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card onClick={() => handlePackageClick(tour)}>
                <CardContent
                    sx={{
                      height: "350px",
                      background: `url(${tour.image})`,
                      color: "white",
                      position: "relative",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "white",
                        color: "var(--maroon)",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      variant="subtitle2"
                    >
                      {tour.date}
                    </Typography>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "white",
                      }}
                    >
                      <FavoriteIcon/>
                    </IconButton>
                    <Box
                      sx={{
                        position: "absolute",
                        backgroundImage:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
                        height: "100%",
                        width: "100%",
                        bottom: 0,
                        left: 0,
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* <Typography
                        sx={{
                          background: "white",
                          color: "var(--maroon)",
                          width: "fit-content",
                          padding: "5px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                        }}
                        variant="subtitle1"
                        gutterBottom
                      >
                        {tour.date}
                      </Typography> */}
                      <Typography fontWeight={800} variant="h4" gutterBottom>
                        {tour.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#777777"
                        fontWeight={500}
                      >
                        {tour.duration}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: "#266ef1" }}
                      >
                        {tour.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

       {/* Render SinglePackage component as a pop-up when a package is clicked */}
       {selectedPackage && (
        <Box className="slide-up-modal show">
        <SinglePackage
          tour={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
        </Box>
      )}
    </Box>
  );
}

export default PackagesTours;
