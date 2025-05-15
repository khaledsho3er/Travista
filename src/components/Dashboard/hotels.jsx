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
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import Select from "react-select";
import countries from "world-countries";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Country options for react-select
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
    stars: null,
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
      const response = await axios.get("https://158.220.96.121/api/hotels");
      setHotels(response.data);
    } catch (error) {
      toast.error("Error fetching hotels");
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("https://158.220.96.121/api/cities");
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
            stars: null,
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
      [field]: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    });
  };

  const handleSelectChange = (field, selectedOption) => {
    setHotelData({
      ...hotelData,
      [field]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSave = async () => {
    const { name, city, country, stars } = hotelData;

    if (!name || !city || !country || !stars) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      if (selectedHotel) {
        await axios.put(
          `https://158.220.96.121/api/hotels/${selectedHotel.hotelId}`,
          hotelData
        );
        toast.success("Hotel updated successfully!");
      } else {
        await axios.post("https://158.220.96.121/api/hotels", hotelData);
        toast.success("Hotel added successfully!");
      }

      fetchHotels();
      handleClose();
    } catch (error) {
      toast.error("Error saving hotel");
      console.error("Hotel creation error:", error);
    }
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await axios.delete(`https://158.220.96.121/api/hotels/${hotelId}`);
      toast.success("Hotel deleted successfully!");
      fetchHotels();
    } catch (error) {
      toast.error("Error deleting hotel");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer />

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
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(hotel)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
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
            <TextField
              margin="normal"
              fullWidth
              label="City"
              name="city"
              value={hotelData.city}
              onChange={handleChange}
              select
            >
              {cities.map((city) => (
                <MenuItem key={city._id} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="body2" gutterBottom>
              Country
            </Typography>
            <Select
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              options={countryOptions}
              value={
                hotelData.country
                  ? { value: hotelData.country, label: hotelData.country }
                  : null
              }
              onChange={(opt) => handleSelectChange("country", opt)}
            />
            <Typography variant="body2" gutterBottom>
              Stars
            </Typography>
            <Select
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
              options={starOptions}
              value={
                hotelData.stars
                  ? starOptions.find((opt) => opt.value === hotelData.stars)
                  : null
              }
              onChange={(opt) => handleSelectChange("stars", opt)}
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
            <Box mt={2}>
              <Typography variant="body2">Meals</Typography>
              <Select
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={mealsOptions.map((m) => ({ value: m, label: m }))}
                isMulti
                value={hotelData.meals.map((m) => ({ value: m, label: m }))}
                onChange={(opts) => handleMultiSelectChange("meals", opts)}
              />
            </Box>

            <Box mt={2}>
              <Typography variant="body2">Categories</Typography>
              <Select
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={hotelCategories.map((c) => ({ value: c, label: c }))}
                isMulti
                value={hotelData.categories.map((c) => ({
                  value: c,
                  label: c,
                }))}
                onChange={(opts) => handleMultiSelectChange("categories", opts)}
              />
            </Box>

            <Box mt={2}>
              <Typography variant="body2">Amenities</Typography>
              <Select
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                options={amenitiesOptions.map((a) => ({ value: a, label: a }))}
                isMulti
                value={hotelData.amenities.map((a) => ({ value: a, label: a }))}
                onChange={(opts) => handleMultiSelectChange("amenities", opts)}
              />
            </Box>
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
