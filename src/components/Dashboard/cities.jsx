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
import { Add } from "@mui/icons-material";
import axios from "axios";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CityManagement = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState({ name: "", country: "" });

  // Fetch cities and countries from API
  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get("https://api.travistasl.com/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Error fetching cities");
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://api.travistasl.com/api/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Error fetching countries");
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
    setCityData({ ...cityData, country: selectedOption.value }); // Store country ID
  };

  // Add or Update City
  const handleSave = async () => {
    if (!cityData.name || !cityData.country) {
      toast.warning("Please enter a valid city name and select a country.");
      return;
    }

    console.log("City Data Sent:", cityData); // Debugging log

    try {
      let response;
      if (selectedCity) {
        // Update City
        response = await axios.put(
          `https://api.travistasl.com/api/cities/${selectedCity.cityId}`,
          cityData,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("City updated successfully!");
      } else {
        // Add City
        response = await axios.post(
          "https://api.travistasl.com/api/cities",
          cityData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success("City added successfully!");
      }

      console.log("Server Response:", response.data); // Debugging log
      fetchCities(); // Refresh city list
      handleClose(); // Close modal
    } catch (error) {
      console.error(
        "Error saving city:",
        error.response?.data || error.message
      );
      toast.error("Error saving city");
    }
  };

  // Delete City
  const handleDelete = async (selectedCity) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    try {
      await axios.delete(
        `https://api.travistasl.com/api/cities/${selectedCity._id}`
      );
      toast.success("City deleted successfully!");
      fetchCities();
    } catch (error) {
      console.error("Error deleting city:", error);
      toast.error("Error deleting city");
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
            {cities.map((city, index) => (
              <TableRow
                key={city.cityId}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                }}
              >
                <TableCell>{city.cityId}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>
                  {city.country ? city.country.name : "No Country"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(city)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
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
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ backdropFilter: "blur(5px)" }}
      >
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
              options={countries.map((c) => ({ value: c._id, label: c.name }))}
              value={
                countries.find((c) => c._id === cityData.country)
                  ? {
                      value: cityData.country,
                      label: countries.find((c) => c._id === cityData.country)
                        ?.name,
                    }
                  : null
              }
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
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default CityManagement;
