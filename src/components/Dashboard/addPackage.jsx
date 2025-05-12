// components/AddPackage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
  IconButton,
  Divider,
  Autocomplete,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import currencyCodes from "currency-codes";
import { createPackage } from "../../services/packageService";
import { getAllCities } from "../../services/cityService";
import { getAllHotels } from "../../services/hotelServices";
import { getAllCountries } from "../../services/countryService";
import axios from "axios";
const currencyOptions = currencyCodes.data.map((c) => ({
  value: c.code,
  label: `${c.code} - ${c.currency}`,
}));

const blurModalStyle = {
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentBoxStyle = {
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "15px",
  padding: "20px",
  maxWidth: "90vw",
  width: 800,
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: 24,
};

const AddPackage = ({ open, handleClose, onPackageCreated }) => {
  const [destinations, setDestinations] = useState([""]);
  const [flights, setFlights] = useState([
    { airline: "", date: "", route: "", depart: "", arrival: "" },
  ]);
  const [hotels, setHotels] = useState([
    { city: "", nights: "", hotelName: "", single: "", double: "", triple: "" },
  ]);
  const [includes, setIncludes] = useState([""]);
  const [excludes, setExcludes] = useState([""]);
  const [packagePicture, setPackagePicture] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [generalNotes, setGeneralNotes] = useState([""]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [packagePrice, setPackagePrice] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalDays, setTotalDays] = useState("");
  const [totalNights, setTotalNights] = useState("");
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedTour, setSelectedTour] = useState("");
  const [availableTours, setAvailableTours] = useState([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB limit for images

  const validateFileSize = (file, maxSize) => {
    if (file.size > maxSize) {
      throw new Error(
        `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`
      );
    }
  };
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tours");
        setAvailableTours(response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError("Failed to load tours");
      }
    };

    if (open) {
      fetchTours();
    }
  }, [open]);
  // Add this function to handle tour selection
  const handleTourSelect = (event) => {
    const tourId = event.target.value;
    setSelectedTour(tourId);

    if (tourId) {
      const selected = availableTours.find((tour) => tour._id === tourId);
      if (selected) {
        // Here you can populate form fields with the selected tour data
        // For example:
        setDestinations(selected.destinations || [""]);
        setTotalDays(selected.totalDays || "");
        setTotalNights(selected.totalNights || "");
        setIsActive(selected.isActive || true);
        // ... populate other fields as needed ...
      }
    }
  };

  const handleAddItem = (setter, defaultValue) => {
    setter((prev) => [...prev, defaultValue]);
  };

  const handleRemoveItem = (index, setter) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (arr, setArr, index) => {
    const newArr = [...arr];
    [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]];
    setArr(newArr);
  };

  const handleMoveDown = (arr, setArr, index) => {
    const newArr = [...arr];
    [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
    setArr(newArr);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) resolve(null);

      try {
        validateFileSize(
          file,
          file.type.startsWith("image/") ? MAX_IMAGE_SIZE : MAX_FILE_SIZE
        );

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      } catch (err) {
        reject(err);
      }
    });
  };

  const generateRandomTravistaID = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TRAV-${timestamp}-${random}`;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validate required fields
      if (
        !destinations[0] ||
        !totalDays ||
        !totalNights ||
        !packagePrice ||
        !selectedCurrency
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Generate a random travistaID
      const travistaID = generateRandomTravistaID();
      console.log("Generated TravistaID:", travistaID); // Debug log

      // Create FormData for file uploads
      const formData = new FormData();

      // Add files to FormData if they exist
      if (packagePicture) {
        formData.append("packagePicture", packagePicture);
      }
      if (pdfFile) {
        formData.append("pdfDocument", pdfFile);
      }

      // Add other package data
      const packageData = {
        packageName,
        travistaID: travistaID, // Ensure ID is included
        isActive,
        departureDate: new Date(),
        destinations: destinations
          .filter((dest) => dest?.name?.trim() !== "")
          .map((dest) => dest.name),
        totalDays: parseInt(totalDays),
        totalNights: parseInt(totalNights),
        generalNotes: generalNotes.filter((note) => note.trim() !== ""),
        packagePrice: {
          amount: parseFloat(packagePrice),
          currency: selectedCurrency?.value || "USD",
        },
        flights: flights.filter((flight) => flight.airline.trim() !== ""),
        hotels: hotels
          .filter((hotel) => hotel.city?.name?.trim() !== "")
          .map((hotel) => ({
            city: hotel.city.name,
            nights: hotel.nights,
            hotelName:
              typeof hotel.hotelName === "string"
                ? hotel.hotelName
                : hotel.hotelName?.name || "",
            single: hotel.single,
            double: hotel.double,
            triple: hotel.triple,
          })),
        includes: includes.filter((item) => item.trim() !== ""),
        excludes: excludes.filter((item) => item.trim() !== ""),

        tour: selectedTour || undefined,
      };

      // Add package data to FormData
      formData.append("packageData", JSON.stringify(packageData));

      // Debug log to check the data being sent
      console.log("Package Data:", packageData);

      // Send to backend
      const response = await createPackage(formData);

      setSuccess(true);
      onPackageCreated?.(response.data);

      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      resetForm();
    } catch (err) {
      console.error("Package creation error:", err);
      setError(err.message || "Failed to create package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDestinations([""]);
    setFlights([
      {
        airline: "",
        date: "",
        from: "",
        to: "",
        departureDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
      },
    ]);
    setHotels([
      {
        city: "",
        nights: "",
        hotelName: "",
        single: "",
        double: "",
        triple: "",
      },
    ]);
    setPackageName("");
    setIncludes([""]);
    setExcludes([""]);
    setPackagePicture(null);
    setGeneralNotes([""]);
    setSelectedCurrency(null);
    setPackagePrice("");
    setPdfFile(null);
    setTotalDays("");
    setTotalNights("");
    setIsActive(true);
    setSelectedTour(""); // Reset tour selection
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const citiesData = await getAllCities();
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("Failed to load cities. Please try again.");
      } finally {
        setLoadingCities(false);
      }
    };

    if (open) {
      fetchCities();
    }
  }, [open]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoadingHotels(true);
        const hotelData = await getAllHotels();
        setHotelList(hotelData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoadingHotels(false);
      }
    };

    if (open) {
      fetchHotels(); // along with fetchCities
    }
  }, [open]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);
        const countryData = await getAllCountries();
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries. Please try again.");
      } finally {
        setLoadingCountries(false);
      }
    };

    if (open) {
      fetchCountries();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose} sx={blurModalStyle}>
      <Box sx={contentBoxStyle}>
        <Typography variant="h5" mb={2}>
          Add New Travel Package
        </Typography>
        <Stack spacing={3}>
          {/* Main Details */}
          <Divider textAlign="left">Package Picture</Divider>
          {packagePicture && (
            <Box
              component="img"
              src={URL.createObjectURL(packagePicture)}
              sx={{ height: 150, width: "auto", borderRadius: 2, mb: 2 }}
            />
          )}
          <Button variant="contained" component="label">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setPackagePicture(e.target.files[0])}
            />
          </Button>
          <TextField
            fullWidth
            label="Package Name"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Departure Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          {destinations.map((dest, index) => (
            <Stack key={index} direction="row" spacing={2}>
              <Autocomplete
                fullWidth
                options={countries}
                getOptionLabel={(option) => option.name}
                value={dest}
                onChange={(event, newValue) => {
                  const newDestinations = [...destinations];
                  newDestinations[index] = newValue;
                  setDestinations(newDestinations);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Destination ${index + 1}`}
                    error={!dest && index === 0}
                    helperText={
                      !dest && index === 0
                        ? "First destination is required"
                        : ""
                    }
                  />
                )}
                loading={loadingCountries}
                loadingText="Loading countries..."
                noOptionsText="No countries found"
              />

              <IconButton
                onClick={() => handleRemoveItem(index, setDestinations)}
                disabled={index === 0}
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() => handleAddItem(setDestinations, "")}
          >
            Add Destination
          </Button>

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Total Days"
              type="number"
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
            />
            <TextField
              fullWidth
              label="Total Nights"
              type="number"
              value={totalNights}
              onChange={(e) => setTotalNights(e.target.value)}
            />
          </Stack>

          <Divider textAlign="left">General Notes</Divider>
          {generalNotes.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                label={`Note ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const updated = [...generalNotes];
                  updated[index] = e.target.value;
                  setGeneralNotes(updated);
                }}
              />
              <IconButton
                disabled={index === 0}
                onClick={() =>
                  handleMoveUp(generalNotes, setGeneralNotes, index)
                }
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                disabled={index === generalNotes.length - 1}
                onClick={() =>
                  handleMoveDown(generalNotes, setGeneralNotes, index)
                }
              >
                <ArrowDownward />
              </IconButton>
              <IconButton
                onClick={() => handleRemoveItem(index, setGeneralNotes)}
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() => handleAddItem(setGeneralNotes, "")}
          >
            Add Note
          </Button>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
              label="Package Price"
              fullWidth
              type="number"
              value={packagePrice}
              onChange={(e) => setPackagePrice(e.target.value)}
            />
            <Autocomplete
              options={currencyOptions}
              getOptionLabel={(option) => option.label}
              value={selectedCurrency}
              onChange={(event, newValue) => setSelectedCurrency(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Currency" />
              )}
              sx={{ width: 200 }}
            />
          </Box>

          {/* Flights */}
          <Divider textAlign="left">Airline Tickets</Divider>
          {flights.map((flight, index) => (
            <Stack spacing={2} key={index}>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth label="Airline Name" sx={{ flex: 2 }} />
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField label="From" fullWidth sx={{ flex: 1 }} />
                <TextField label="To" fullWidth sx={{ flex: 1 }} />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  label="Departure Date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                />
                <TextField label="Departure Time" fullWidth sx={{ flex: 1 }} />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  label="Arrival Date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                />
                <TextField label="Arrival Time" fullWidth sx={{ flex: 1 }} />
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <IconButton onClick={() => handleRemoveItem(index, setFlights)}>
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() =>
              handleAddItem(setFlights, {
                airline: "",
                date: "",
                route: "",
                depart: "",
                arrival: "",
              })
            }
          >
            Add Airline Ticket
          </Button>

          {/* Hotels */}
          <Divider textAlign="left">Hotel Accommodations</Divider>
          {hotels.map((hotel, index) => (
            <Stack spacing={1} key={index}>
              <Stack direction="row" spacing={2}>
                <Autocomplete
                  fullWidth
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  value={hotel.city}
                  onChange={(event, newValue) => {
                    const newHotels = [...hotels];
                    newHotels[index] = { ...newHotels[index], city: newValue };
                    setHotels(newHotels);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      error={!hotel.city && index === 0}
                      helperText={
                        !hotel.city && index === 0 ? "City is required" : ""
                      }
                    />
                  )}
                  loading={loadingCities}
                  loadingText="Loading cities..."
                  noOptionsText="No cities found"
                />
                <TextField
                  fullWidth
                  label="Nights"
                  value={hotel.nights}
                  onChange={(e) => {
                    const newHotels = [...hotels];
                    newHotels[index] = {
                      ...newHotels[index],
                      nights: e.target.value,
                    };
                    setHotels(newHotels);
                  }}
                />
                <Autocomplete
                  fullWidth
                  options={hotelList}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  value={hotel.hotelName}
                  onChange={(event, newValue) => {
                    const newHotels = [...hotels];
                    newHotels[index] = {
                      ...newHotels[index],
                      hotelName: newValue,
                    };
                    setHotels(newHotels);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Hotel Name" />
                  )}
                  loading={loadingHotels}
                  loadingText="Loading hotels..."
                  noOptionsText="No hotels found"
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Single Room Price"
                  value={hotel.single}
                  onChange={(e) => {
                    const newHotels = [...hotels];
                    newHotels[index] = {
                      ...newHotels[index],
                      single: e.target.value,
                    };
                    setHotels(newHotels);
                  }}
                />
                <TextField
                  fullWidth
                  label="Double Room Price"
                  value={hotel.double}
                  onChange={(e) => {
                    const newHotels = [...hotels];
                    newHotels[index] = {
                      ...newHotels[index],
                      double: e.target.value,
                    };
                    setHotels(newHotels);
                  }}
                />
                <TextField
                  fullWidth
                  label="Triple Room Price"
                  value={hotel.triple}
                  onChange={(e) => {
                    const newHotels = [...hotels];
                    newHotels[index] = {
                      ...newHotels[index],
                      triple: e.target.value,
                    };
                    setHotels(newHotels);
                  }}
                />
                <IconButton onClick={() => handleRemoveItem(index, setHotels)}>
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() =>
              handleAddItem(setHotels, {
                city: "",
                nights: "",
                hotelName: "",
                single: "",
                double: "",
                triple: "",
              })
            }
          >
            Add Hotel
          </Button>

          {/* Includes */}
          <Divider textAlign="left">Package Includes</Divider>
          {includes.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                label={`Include ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const newIncludes = [...includes];
                  newIncludes[index] = e.target.value;
                  setIncludes(newIncludes);
                }}
              />
              <IconButton
                disabled={index === 0}
                onClick={() => handleMoveUp(includes, setIncludes, index)}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                disabled={index === includes.length - 1}
                onClick={() => handleMoveDown(includes, setIncludes, index)}
              >
                <ArrowDownward />
              </IconButton>
              <IconButton onClick={() => handleRemoveItem(index, setIncludes)}>
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() => handleAddItem(setIncludes, "")}
          >
            Add Include Point
          </Button>

          {/* Excludes */}
          <Divider textAlign="left">Package Excludes</Divider>
          {excludes.map((item, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center">
              <TextField
                fullWidth
                label={`Exclude ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const newExcludes = [...excludes];
                  newExcludes[index] = e.target.value;
                  setExcludes(newExcludes);
                }}
              />
              <IconButton
                disabled={index === 0}
                onClick={() => handleMoveUp(excludes, setExcludes, index)}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                disabled={index === excludes.length - 1}
                onClick={() => handleMoveDown(excludes, setExcludes, index)}
              >
                <ArrowDownward />
              </IconButton>
              <IconButton onClick={() => handleRemoveItem(index, setExcludes)}>
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<Add />}
            onClick={() => handleAddItem(setExcludes, "")}
          >
            Add Exclude Point
          </Button>
          <Divider textAlign="left">Tour /Daily Programs</Divider>
          <Stack spacing={3}>
            {/* Add Tour Selection Dropdown at the top */}
            <FormControl fullWidth>
              <InputLabel id="tour-select-label">
                Select Existing Tour
              </InputLabel>
              <Select
                labelId="tour-select-label"
                value={selectedTour}
                onChange={handleTourSelect}
                label="Select Existing Tour"
              >
                {availableTours.map((tour) => (
                  <MenuItem key={tour._id} value={tour._id}>
                    {tour.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Add Active Toggle Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  color="primary"
                />
              }
              label={isActive ? "Active" : "Inactive"}
              labelPlacement="start"
              sx={{ justifyContent: "space-between", ml: 0 }}
            />
          </Stack>
          {/* PDF Upload Section */}
          <Divider textAlign="left">Additional Documents</Divider>
          <Stack spacing={2}>
            {pdfFile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1">{pdfFile.name}</Typography>
                <IconButton onClick={() => setPdfFile(null)}>
                  <Delete />
                </IconButton>
              </Box>
            )}
            <Button
              variant="contained"
              component="label"
              sx={{ alignSelf: "flex-start" }}
            >
              Upload PDF Document
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
            </Button>
          </Stack>

          <Divider />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Creating Package..." : "Submit Package"}
          </Button>
        </Stack>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity="success"
            onClose={() => setSuccess(false)}
            sx={{ width: "100%" }}
          >
            Package created successfully! Redirecting...
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default AddPackage;
