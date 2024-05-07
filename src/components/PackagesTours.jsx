import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

function PackagesTours() {
  const [filter, setFilter] = useState("");

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

  const filteredTours = filter
    ? tours.filter((tour) =>
        tour.name.toLowerCase().includes(filter.toLowerCase())
      )
    : tours;

  return (
    <Box className="packages-page">
      <Box className="hero">
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust the opacity as needed
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
              <Card>
                <CardContent
                  sx={{
                    height: "350px",
                    background: `url(${tour.image})`,
                    color: "white",
                    position: "relative",
                  }}
                >
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
                    {" "}
                    <Typography
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
                    </Typography>
                    <Typography fontWeight={800} variant="h4" gutterBottom>
                      {tour.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#777777"
                      fontWeight={600}
                    >
                      {tour.duration}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "var(--accent)" }}
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
    </Box>
  );
}

export default PackagesTours;
