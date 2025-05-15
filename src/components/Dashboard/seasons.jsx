import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeasonManagement = () => {
  const [seasons, setSeasons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonData, setSeasonData] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  // Fetch seasons from API
  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      const response = await axios.get("https://158.220.96.121/api/seasons");
      setSeasons(response.data);
    } catch (error) {
      console.error("Error fetching seasons:", error);
    }
  };

  // Open dialog (for adding/editing a season)
  const handleOpen = (season = null) => {
    setSelectedSeason(season);
    setSeasonData(
      season
        ? {
            name: season.name,
            startDate: season.startDate.split("T")[0], // Convert ISO date to "YYYY-MM-DD"
            endDate: season.endDate.split("T")[0],
          }
        : { name: "", startDate: "", endDate: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSeason(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setSeasonData({ ...seasonData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!seasonData.name || !seasonData.startDate || !seasonData.endDate) {
      toast.warning("Please fill all the fields.");
      return;
    }

    try {
      let response;
      if (selectedSeason) {
        // Update season
        response = await axios.put(
          `https://158.220.96.121/api/seasons/${selectedSeason.seasonId}`,
          {
            name: seasonData.name,
            startDate: new Date(seasonData.startDate).toISOString(),
            endDate: new Date(seasonData.endDate).toISOString(),
          }
        );
        toast.success("Season updated successfully!");
      } else {
        // Add season
        response = await axios.post("https://158.220.96.121/api/seasons", {
          name: seasonData.name,
          startDate: new Date(seasonData.startDate).toISOString(),
          endDate: new Date(seasonData.endDate).toISOString(),
        });
        toast.success("Season added successfully!");
      }

      console.log("Server Response:", response.data);
      fetchSeasons();
      handleClose();
    } catch (error) {
      console.error(
        "Error saving season:",
        error.response?.data || error.message
      );
      toast.error("Error saving Season");
    }
  };

  // Delete Season
  const handleDelete = async (seasonId) => {
    if (!window.confirm("Are you sure you want to delete this season?")) return;
    try {
      await axios.delete(`https://158.220.96.121/api/seasons/${seasonId}`);
      toast.success("Season deleted successfully!");
      fetchSeasons();
    } catch (error) {
      console.error("Error deleting season:", error);
      toast.error("Error Deleting season");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Seasons
      </Typography>

      {/* Add Season Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add Season
      </Button>

      {/* Seasons Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Season ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Start Date</strong>
              </TableCell>
              <TableCell>
                <strong>End Date</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seasons.map((season) => (
              <TableRow key={season.seasonId}>
                <TableCell>{season.seasonId}</TableCell>
                <TableCell>{season.name}</TableCell>
                <TableCell>{season.startDate.split("T")[0]}</TableCell>
                <TableCell>{season.endDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpen(season)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(season.seasonId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Season Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedSeason ? "Edit Season" : "Add Season"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Season Name"
            name="name"
            value={seasonData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Start Date</Typography>
            <input
              type="date"
              name="startDate"
              value={seasonData.startDate}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">End Date</Typography>
            <input
              type="date"
              name="endDate"
              value={seasonData.endDate}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedSeason ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default SeasonManagement;
