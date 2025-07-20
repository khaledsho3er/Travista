import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProgramPopup = ({ packageId, onClose, open }) => {
  const [dailyPrograms, setDailyPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    const fetchDailyProgram = async () => {
      try {
        const response = await fetch(
          `https://api.travistasl.com/api/tours/${packageId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch daily program");
        }
        const data = await response.json();
        setDailyPrograms(data.dailyPrograms || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyProgram();
  }, [packageId, open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Daily Program
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: "70vh" }}>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : dailyPrograms.length === 0 ? (
          <Typography>No daily program available</Typography>
        ) : (
          dailyPrograms.map((day) => (
            <Box key={day._id} mb={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold" color="#750046">
                  Day {day.dayNumber}: {day.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {formatDate(day.date)}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="textSecondary" mb={1}>
                {day.city}, {day.country}
              </Typography>
              <Box
                sx={{
                  backgroundColor: day.price.included ? "#e8f5e9" : "#ffebee",
                  p: 1,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2">
                  {day.price.included
                    ? "Included in package price"
                    : `Optional activity: £${day.price.excluded.adult} per adult, £${day.price.excluded.child} per child`}
                </Typography>
              </Box>
              {day.description.map((item, index) => (
                <Box key={index} display="flex" mb={1}>
                  <Box mr={1}>•</Box>
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
              <hr style={{ marginTop: "16px", borderColor: "#f0f0f0" }} />
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Box flex={1} />
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProgramPopup;
