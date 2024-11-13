import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PackageCards({ tour }) {
  return (
    <Card
      sx={{
        background: "var(--dark-green)",
        borderRadius: "1.25rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        height: "350px",
        width: "350px",
        position: "relative",
        color: "white",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover .hover-content": {
          transform: "translateY(-50px)",
        },
        "&:hover .hover-buttons": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      <CardContent
        sx={{
          height: "100%",
          backgroundImage: `url(${tour.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          position: "relative",
          borderRadius: "12px",
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
          Tour
        </Typography>

        <IconButton
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
          }}
        >
          <FavoriteIcon />
        </IconButton>

        {/* Content that moves up on hover */}
        <Box
          className="hover-content"
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "30px",
            transition: "transform 0.3s ease",
            zIndex: 1,
          }}
        >
          <Typography fontWeight={800} variant="h5" gutterBottom>
            {tour.name}
          </Typography>
          <Typography variant="body2" color="#dddddd" fontWeight={600}>
            {tour.duration}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#fed7d2" }}>
            {tour.price}
          </Typography>
        </Box>

        {/* Buttons that appear on hover */}
        <Box
          className="hover-buttons"
          sx={{
            position: "absolute",
            bottom: "60px",
            left: "30px",
            display: "flex",
            gap: "10px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 1,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderColor: "#eceee9",
              color: "#eceee9",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            Explore Tour
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "#3b3c3a",
              backgroundColor: "#eceee9",
              borderColor: "#eceee9",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PackageCards;
