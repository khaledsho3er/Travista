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
import Select from "react-select";
import countries from "world-countries";

// Format country data for dropdown
const countryOptions = countries.map((country) => ({
  value: country.name.common, // Country name
  label: country.name.common, // Display name
}));

const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState({ name: "", country: "" });

  // Fetch cities from API
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Open the dialog (for adding/editing a city)
  const handleOpen = (city = null) => {
    setSelectedCity(city);
    setCityData(
      city
        ? { name: city.name, country: city.country }
        : { name: "", country: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCity(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setCityData({ ...cityData, [e.target.name]: e.target.value });
  };

  // Handle country dropdown change
  const handleCountryChange = (selectedOption) => {
    setCityData({ ...cityData, country: selectedOption.value });
  };

  // Add or Update City
  const handleSave = async () => {
    if (!cityData.name || !cityData.country) {
      alert("Please enter a valid city name and select a country.");
      return;
    }

    console.log("City Data Sent:", cityData); // Log data before sending

    try {
      let response;
      if (selectedCity) {
        // Update City
        response = await axios.put(
          `http://localhost:5000/api/cities/${selectedCity.cityId}`,
          cityData,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // Add City
        response = await axios.post(
          "http://localhost:5000/api/cities",
          cityData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      console.log("Server Response:", response.data); // Log API response
      fetchCities(); // Refresh city list
      handleClose(); // Close modal
    } catch (error) {
      console.error(
        "Error saving city:",
        error.response?.data || error.message
      );
    }
  };

  // Delete City
  const handleDelete = async (cityId) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/cities/${cityId}`, {});
      fetchCities();
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Cities
      </Typography>

      {/* Add City Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add City
      </Button>

      {/* Cities Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>City ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Country</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.cityId}>
                <TableCell>{city.cityId}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(city)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(city.cityId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit City Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedCity ? "Edit City" : "Add City"}</DialogTitle>
        <DialogContent>
          <TextField
            label="City Name"
            name="name"
            value={cityData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2 }}>
            <Select
              options={countryOptions}
              value={countryOptions.find((c) => c.value === cityData.country)}
              onChange={handleCountryChange}
              placeholder="Select a Country"
              isSearchable
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Fix z-index issue
              }}
              menuPortalTarget={document.body} // Render dropdown outside Dialog
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedCity ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CityManagement;
