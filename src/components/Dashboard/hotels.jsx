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
  MenuItem,
  Select,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import SelectDropdown from "react-select";
import countries from "world-countries";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Extract country names
const countryOptions = countries.map((c) => ({
  value: c.name.common,
  label: c.name.common,
}));

const hotelCategories = ["Luxury", "Budget", "Business", "Resort"];
const mealsOptions = ["Breakfast", "Lunch", "Dinner", "All-Inclusive"];
const amenitiesOptions = ["WiFi", "Pool", "Gym", "Parking"];
const starOptions = [1, 2, 3, 4, 5].map((star) => ({
  value: star,
  label: `${star} ⭐`,
}));
const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [cities, setCities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelData, setHotelData] = useState({
    name: "",
    city: "",
    country: "",
    locationURL: "",
    stars: "",
    meals: [],
    categories: [],
    amenities: [],
  });

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/hotels");
      setHotels(response.data);
    } catch (error) {
      toast.error("Error fetching hotels");
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cities");
      setCities(response.data);
    } catch (error) {
      toast.error("Error fetching cities");
    }
  };

  const handleOpen = (hotel = null) => {
    setSelectedHotel(hotel);
    setHotelData(
      hotel
        ? { ...hotel }
        : {
            name: "",
            city: "",
            country: "",
            locationURL: "",
            stars: "",
            meals: [],
            categories: [],
            amenities: [],
          }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedHotel(null);
  };

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (field, selectedOptions) => {
    setHotelData({
      ...hotelData,
      [field]: selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [],
    });
  };

  const handleSave = async () => {
    if (
      !hotelData.name ||
      !hotelData.city ||
      !hotelData.country ||
      !hotelData.stars
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      if (selectedHotel) {
        await axios.put(
          `http://localhost:5000/api/hotels/${selectedHotel.hotelId}`,
          hotelData
        );
        toast.success("Hotel updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/hotels", hotelData);
        toast.success("Hotel added successfully!");
      }

      fetchHotels();
      handleClose();
    } catch (error) {
      toast.error("Error saving hotel");
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`);
      toast.success("Hotel deleted successfully!");
      fetchHotels();
    } catch (error) {
      toast.error("Error deleting hotel");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Hotels
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add Hotel
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Hotel ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>City</strong>
              </TableCell>
              <TableCell>
                <strong>Country</strong>
              </TableCell>
              <TableCell>
                <strong>Stars</strong>
              </TableCell>
              <TableCell>
                <strong>Categories</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.map((hotel) => (
              <TableRow key={hotel.hotelId}>
                <TableCell>{hotel.hotelId}</TableCell>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>{hotel.country}</TableCell>
                <TableCell>{hotel.stars} ⭐</TableCell>
                <TableCell>{hotel.categories.join(", ")}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(hotel)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(hotel.hotelId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Hotel Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{selectedHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
        <DialogContent sx={{ width: "600px", maxWidth: "100%", mt: 2 }}>
          <TextField
            label="Hotel Name"
            name="name"
            value={hotelData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 2,
              mt: 2,
            }}
          >
            <Select
              value={hotelData.city || ""}
              name="city"
              onChange={handleChange}
              fullWidth
              sx={{ mt: 2 }}
              displayEmpty
              renderValue={(value) => (value ? value : "Select City")}
            >
              {cities.map((city) => (
                <MenuItem key={city.cityId} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
            <SelectDropdown
              options={countryOptions}
              onChange={(selected) =>
                handleMultiSelectChange("country", [selected])
              }
              placeholder="Select Country"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
            <SelectDropdown
              options={starOptions}
              onChange={(selected) =>
                handleMultiSelectChange("stars", [selected])
              }
              placeholder="Select Stars"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Box>
          <TextField
            label="Location URL"
            name="locationURL"
            value={hotelData.locationURL}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <SelectDropdown
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              options={hotelCategories.map((c) => ({ value: c, label: c }))}
              isMulti
              onChange={(selected) =>
                handleMultiSelectChange("categories", selected)
              }
              placeholder="Select Categories"
              menuPortalTarget={document.body}
            />
            <SelectDropdown
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              options={mealsOptions.map((m) => ({ value: m, label: m }))}
              isMulti
              onChange={(selected) =>
                handleMultiSelectChange("meals", selected)
              }
              placeholder="Select Meals"
              menuPortalTarget={document.body}
            />
            <SelectDropdown
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              options={amenitiesOptions.map((a) => ({ value: a, label: a }))}
              isMulti
              onChange={(selected) =>
                handleMultiSelectChange("amenities", selected)
              }
              placeholder="Select Amenities"
              menuPortalTarget={document.body}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedHotel ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default HotelManagement;
