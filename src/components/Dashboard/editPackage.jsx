// components/EditPackage.js
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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import currencyCodes from "currency-codes";
import { deletePackage } from "../../services/packageService";
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

const EditPackage = ({
  open,
  handleClose,
  packageData,
  onPackageUpdated,
  onPackageDeleted,
}) => {
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
  const [deleting, setDeleting] = useState(false);

  // const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  // const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB limit for images

  useEffect(() => {
    if (packageData) {
      // Set form fields with packageData
      setDestinations(
        packageData.destinations.map((dest) => ({ name: dest })) || [""]
      );
      setFlights(
        packageData.flights || [
          { airline: "", date: "", route: "", depart: "", arrival: "" },
        ]
      );
      setHotels(
        packageData.hotels || [
          {
            city: "",
            nights: "",
            hotelName: "",
            single: "",
            double: "",
            triple: "",
          },
        ]
      );
      setIncludes(packageData.includes || [""]);
      setExcludes(packageData.excludes || [""]);
      setGeneralNotes(packageData.generalNotes || [""]);
      setSelectedCurrency(
        currencyOptions.find(
          (opt) => opt.value === packageData.packagePrice?.currency
        ) || null
      );
      setPackagePrice(packageData.packagePrice?.amount?.toString() || "");
      setTotalDays(packageData.totalDays?.toString() || "");
      setTotalNights(packageData.totalNights?.toString() || "");
    }
  }, [packageData]);

  // const validateFileSize = (file, maxSize) => {
  //   if (file.size > maxSize) {
  //     throw new Error(
  //       `File size exceeds the limit of ${maxSize / (1024 * 1024)}MB`
  //     );
  //   }
  // };

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

  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     if (!file) resolve(null);

  //     try {
  //       validateFileSize(
  //         file,
  //         file.type.startsWith("image/") ? MAX_IMAGE_SIZE : MAX_FILE_SIZE
  //       );

  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // };

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

      const formData = new FormData();

      // Only append files if they're new
      if (packagePicture && packagePicture instanceof File) {
        formData.append("packagePicture", packagePicture);
      }
      if (pdfFile && pdfFile instanceof File) {
        formData.append("pdfDocument", pdfFile);
      }

      // Create the package data object
      const updatedPackageData = {
        travistaID: packageData.travistaID,
        departureDate: packageData.departureDate,
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
      };

      // Important: Append as JSON string
      formData.append("packageData", JSON.stringify(updatedPackageData));

      // Debug what's being sent
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.put(
        `http://localhost:5000/api/packages/${packageData._id}`,
        updatedPackageData
      );

      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      setSuccess(true);
      onPackageUpdated?.(response.data);
    } catch (err) {
      console.error("Package update error:", err);
      setError(err.message || "Failed to update package. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deletePackage(packageData._id);
      onPackageDeleted?.(packageData._id);
      handleClose();
    } catch (err) {
      console.error("Package deletion error:", err);
      setError(err.message || "Failed to delete package. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  // const resetForm = () => {
  //   setDestinations([""]);
  //   setFlights([{ airline: "", date: "", route: "", depart: "", arrival: "" }]);
  //   setHotels([
  //     {
  //       city: "",
  //       nights: "",
  //       hotelName: "",
  //       single: "",
  //       double: "",
  //       triple: "",
  //     },
  //   ]);
  //   setIncludes([""]);
  //   setExcludes([""]);
  //   setPackagePicture(null);
  //   setGeneralNotes([""]);
  //   setSelectedCurrency(null);
  //   setPackagePrice("");
  //   setPdfFile(null);
  //   setTotalDays("");
  //   setTotalNights("");
  // };

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
      fetchHotels();
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
          Edit Travel Package
        </Typography>
        <Stack spacing={3}>
          {/* Main Details */}
          <Divider textAlign="left">Package Picture</Divider>
          {packagePicture ? (
            <Box
              component="img"
              src={URL.createObjectURL(packagePicture)}
              sx={{ height: 150, width: "auto", borderRadius: 2, mb: 2 }}
            />
          ) : (
            packageData?.packagePicture && (
              <Box
                component="img"
                src={`http://localhost:5000/${packageData.packagePicture}`}
                sx={{ height: 150, width: "auto", borderRadius: 2, mb: 2 }}
              />
            )
          )}
          <Button variant="contained" component="label">
            Upload New Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setPackagePicture(e.target.files[0])}
            />
          </Button>

          <TextField
            fullWidth
            label="Departure Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={packageData?.departureDate?.split("T")[0] || ""}
            disabled
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
                <TextField
                  fullWidth
                  label="Airline Name"
                  sx={{ flex: 2 }}
                  value={flight.airline}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].airline = e.target.value;
                    setFlights(newFlights);
                  }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                  value={flight.date}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].date = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  label="From"
                  fullWidth
                  sx={{ flex: 1 }}
                  value={flight.route}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].route = e.target.value;
                    setFlights(newFlights);
                  }}
                />
                <TextField
                  label="To"
                  fullWidth
                  sx={{ flex: 1 }}
                  value={flight.route}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].route = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  label="Departure Date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                  value={flight.depart}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].depart = e.target.value;
                    setFlights(newFlights);
                  }}
                />
                <TextField
                  label="Departure Time"
                  fullWidth
                  sx={{ flex: 1 }}
                  value={flight.depart}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].depart = e.target.value;
                    setFlights(newFlights);
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField
                  type="date"
                  label="Arrival Date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{ flex: 1 }}
                  value={flight.arrival}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].arrival = e.target.value;
                    setFlights(newFlights);
                  }}
                />
                <TextField
                  label="Arrival Time"
                  fullWidth
                  sx={{ flex: 1 }}
                  value={flight.arrival}
                  onChange={(e) => {
                    const newFlights = [...flights];
                    newFlights[index].arrival = e.target.value;
                    setFlights(newFlights);
                  }}
                />
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

          {/* PDF Upload Section */}
          <Divider textAlign="left">Additional Documents</Divider>
          <Stack spacing={2}>
            {pdfFile ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1">{pdfFile.name}</Typography>
                <IconButton onClick={() => setPdfFile(null)}>
                  <Delete />
                </IconButton>
              </Box>
            ) : (
              packageData?.pdfDocument && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body1">Current PDF Document</Typography>
                  <IconButton onClick={() => setPdfFile(null)}>
                    <Delete />
                  </IconButton>
                </Box>
              )
            )}
            <Button
              variant="contained"
              component="label"
              sx={{ alignSelf: "flex-start" }}
            >
              Upload New PDF Document
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
            </Button>
          </Stack>

          <Divider />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={deleting || loading}
            >
              {deleting ? "Deleting..." : "Delete Package"}
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || deleting}
            >
              {loading ? "Updating Package..." : "Update Package"}
            </Button>
          </Stack>
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
            Package updated successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default EditPackage;
