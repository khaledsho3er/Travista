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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CountryManagement = () => {
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState({ name: "", code: "" });

  // Fetch countries from API
  useEffect(() => {
    fetchCountries();
  }, []);

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

  // Open the dialog (for adding/editing a country)
  const handleOpen = (country = null) => {
    setSelectedCountry(country);
    setCountryData(
      country
        ? { name: country.name, code: country.code }
        : { name: "", code: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCountry(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setCountryData({ ...countryData, [e.target.name]: e.target.value });
  };

  // Add or Update Country
  const handleSave = async () => {
    if (!countryData.name || !countryData.code) {
      toast.warning("Please enter both country name and code.");
      return;
    }

    try {
      let response;
      if (selectedCountry) {
        // Update country
        response = await axios.put(
          `https://api.travistasl.com/api/countries/${selectedCountry.countryId}`,
          countryData
        );
        toast.success("Country updated successfully!");
      } else {
        // Add country
        response = await axios.post(
          "https://api.travistasl.com/api/countries",
          countryData
        );
        toast.success("Country added successfully!");
      }

      console.log("Server Response:", response.data);
      fetchCountries();
      handleClose();
    } catch (error) {
      console.error(
        "Error saving country:",
        error.response?.data || error.message
      );
      toast.error("Error saving country");
    }
  };

  // Delete Country
  const handleDelete = async (countryId) => {
    if (!window.confirm("Are you sure you want to delete this country?"))
      return;
    try {
      await axios.delete(
        `https://api.travistasl.com/api/countries/${countryId}`
      );
      toast.success("Country deleted successfully!");
      fetchCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
      toast.error("Error deleting country");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Countries
      </Typography>

      {/* Add Country Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add Country
      </Button>

      {/* Countries Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Country ID</strong>
              </TableCell>
              <TableCell>
                <strong>Code</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country, index) => (
              <TableRow
                key={country.countryId}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                }}
              >
                <TableCell>{country.countryId}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(country)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(country.countryId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Country Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {selectedCountry ? "Edit Country" : "Add Country"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Country Code"
            name="code"
            value={countryData.code}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Country Name"
            name="name"
            value={countryData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedCountry ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default CountryManagement;
