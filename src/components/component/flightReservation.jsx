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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function FlightReservation({ flights, setOpen, handleBack, handleNext }) {
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
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        aria-label="return"
        onClick={handleBack}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Choose Your Flight
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
          {flights.map((flight, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: "2px solid #ddd",
                borderRadius: "12px",
                backgroundColor: "transparent",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#750046",
                },
              }}
            >
              <Typography variant="h6" color="#750046" mb={1}>
                Departure Flight
              </Typography>
              <Table
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Airline</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Departure</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Arrival</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Time <br /> Arrival
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{flight.Airline}</TableCell>

                    <TableCell>{flight.Departure}</TableCell>
                    <TableCell>{flight.Arrival}</TableCell>
                    <TableCell>{flight.DepartureDate}</TableCell>
                    <TableCell>{flight.DepartTime}</TableCell>
                    <TableCell>{flight.ArrivalTime}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Typography variant="h6" color="#750046" mt={2} mb={1}>
                Return Flight
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Airline</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Departure</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Arrival</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Time <br /> Arrival
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{flight.ReturnAirline}</TableCell>
                    <TableCell>{flight.ReturnDeparture}</TableCell>
                    <TableCell>{flight.ReturnArrival}</TableCell>
                    <TableCell>{flight.ReturnDate}</TableCell>
                    <TableCell>{flight.ReturnTimeDepart}</TableCell>
                    <TableCell>{flight.ReturnTimeArrive}</TableCell>
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

export default FlightReservation;
