import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function HotelAccommodation({
  hotels,
  selectedHotel,
  setSelectedHotel,
  setOpen,
  handleBack,
  handleNext,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100%" : "40%",
        padding: isSmallScreen ? "16px" : "32px",
        position: "relative",
      }}
    >
      <Link to="/packages">
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          aria-label="close"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </Link>

      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        aria-label="return"
        onClick={handleBack} // Use the handleBack function to navigate to the previous step
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Choose Your Hotel Accommodation
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflowY: "auto",
            maxHeight: "500px",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#750046",
              borderRadius: "3px",
            },
          }}
        >
          {hotels.map((hotel, index) => (
            <Box
              key={index}
              onClick={() => setSelectedHotel(hotel.name)}
              sx={{
                p: 2,
                border: `2px solid ${
                  selectedHotel === hotel.name ? "#750046" : "#ddd"
                }`,
                borderRadius: "12px",
                backgroundColor:
                  selectedHotel === hotel.name ? "#f9f9f9" : "transparent",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#750046",
                },
              }}
            >
              <Table
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                {/* Table Header */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#750046",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      City
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#750046",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#750046",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      Nights
                    </TableCell>

                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        color: "#750046",
                        borderBottom: "2px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      Meal Plan
                    </TableCell>
                  </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      {hotel.city}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      {hotel.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      {hotel.nights}
                    </TableCell>

                    <TableCell
                      sx={{
                        borderBottom: "1px solid #ddd",
                        textAlign: "left",
                      }}
                    >
                      {hotel.MealPlan}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: "12px",
          borderRadius: "25px",
          fontWeight: "bold",
          textTransform: "none",
          marginTop: "20px",
          backgroundColor: "#0f1c24",
          "&:hover": {
            backgroundColor: "#fff",
            border: "2px solid #0f1c24",
            color: "#0f1c24",
          },
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
}

export default HotelAccommodation;
