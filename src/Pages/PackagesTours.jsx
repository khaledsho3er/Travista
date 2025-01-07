import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SinglePackage from "../components/singlePackage";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Filter from "../components/filter";

function PackagesTours() {
  const [selectedFilter, setSelectedFilter] = useState(""); // Manage selected filter state
  const [selectedPackage, setSelectedPackage] = useState(null);

  const tours = [
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Madriad, Barcelona, Rome",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "sports",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, zurich, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "HoneyMoon",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Zurich, Paris, Rome, Florence",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "family",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "sports",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Venice, Barcelona, Prague",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "sports",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "10th Aug",
      name: "Zurich, Paris, Rome, Florence",
      duration: "10 Days, 9 Nights",
      price: "$2,390",
      type: "sports",
    },
  ];

  const handlePackageClick = (tour) => setSelectedPackage(tour);

  const handleFilterChange = (filter) => setSelectedFilter(filter); // Update selected filter

  const filteredTours = selectedFilter
    ? tours.filter(
        (tour) => tour.type.toLowerCase() === selectedFilter.toLowerCase()
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
            <Filter onFilterChange={handleFilterChange} /> {/* Pass callback */}
          </Box>
          {filteredTours.length > 0 ? (
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
                        <FavoriteIcon />
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
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              textAlign="center"
              sx={{ padding: "20px" }}
            >
              No packages found
            </Typography>
          )}
        </Box>
      </div>

      {selectedPackage && (
        <Box
          className={`slide-up-modal ${selectedPackage ? "show" : ""}`}
          onClick={() => setSelectedPackage(null)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <SinglePackage
              tour={selectedPackage}
              onClose={() => setSelectedPackage(null)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PackagesTours;
