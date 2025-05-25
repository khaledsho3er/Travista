import React, { useState, useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import currencyCodes from "currency-codes";
import axios from "axios";
function StepTwo({
  departureCountry,
  setDepartureCountry,
  departureCity,
  setDepartureCity,
  travellers,
  setTravellers,
  budget,
  setBudget,
  travelDate,
  setTravelDate,
  flexibility,
  setFlexibility,
  nights,
  setNights,
}) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("EUR"); // moved here
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [currencyList, setCurrencyList] = useState([]);
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    EGP: "£",
    JPY: "¥",
    INR: "₹",
    AUD: "A$",
    CAD: "C$",
    CNY: "¥",
    AED: "د.إ",
    // Add more as needed
  };
  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://158.220.96.121/api/countries"
        );
        setCountries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      if (!departureCountry) return;

      try {
        setLoading(true);
        // Find the country ID from the selected country name
        const selectedCountryObj = countries.find(
          (c) => c.name === departureCountry
        );

        if (selectedCountryObj) {
          const response = await axios.get(
            `https://158.220.96.121/api/cities/country/${selectedCountryObj.countryId}`
          );
          setCities(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoading(false);
      }
    };

    fetchCities();
  }, [departureCountry, countries]);
  useEffect(() => {
    // Get unique currency codes
    const uniqueCurrencies = currencyCodes.data
      .filter(
        (c, index, self) => self.findIndex((x) => x.code === c.code) === index
      )
      .map((c) => ({
        code: c.code,
        name: c.currency,
      }));

    setCurrencyList(uniqueCurrencies);
  }, []);

  useEffect(() => {
    setCurrencySymbol(currencySymbols[currency] || currency);
  }, [currency]);

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue);
  };

  return (
    <Box className="step-two-container">
      <h5>Step 2 of 3</h5>
      <h4>Set the stage</h4>
      <p>Select the starting point of your voyage...</p>

      <Box className="step-two-container-input-group">
        <select
          className="step-two-container-dropdown"
          value={departureCountry}
          onChange={(e) => setDepartureCountry(e.target.value)}
          disabled={loading}
        >
          <option value="">Departure country</option>
          {countries.map((country) => (
            <option key={country.countryId} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          className="step-two-container-dropdown"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          disabled={loading}
        >
          <option value="">Departure city</option>
          {cities.map((city) => (
            <option key={city.cityId} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </Box>

      <Box className="step-two-container-travellers-container">
        <label className="step-two-travellers-label">No. of travellers</label>
        <Box className="step-two-container-travellers-counter">
          <span className="step-two-counter-travellers-value">
            {travellers}
          </span>
          <div className="step-two-travellers-buttons">
            <button
              onClick={() => setTravellers(Math.max(1, travellers - 1))}
              className="step-two-container-travellers-counter-btn"
            >
              -
            </button>
            <button
              onClick={() => setTravellers(travellers + 1)}
              className="step-two-container-travellers-counter-btn"
            >
              +
            </button>
          </div>
        </Box>
      </Box>
      <Box className="step-two-container-input-group" sx={{ mt: 2 }}>
        <select
          className="step-two-container-dropdown"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencyList.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>
      </Box>
      <Box className="budget-slider-container">
        {/* Label */}
        <Box className="budget-slider-label">
          <Typography variant="subtitle1" className="budget-slider-title">
            Budget per person
          </Typography>

          <Typography variant="subtitle2" className="budget-slider-current">
            <strong>{currencySymbol}</strong>
            {budget}/ Person
          </Typography>
        </Box>

        {/* Slider */}
        <Box className="budget-slider-box">
          <Slider
            value={budget}
            min={500}
            max={5000}
            step={100}
            onChange={handleBudgetChange}
            className="budget-slider"
            valueLabelDisplay="off" // Disable default value label
            componentsProps={{
              thumb: {
                "data-value":
                  currencySymbol.length > 3
                    ? `${budget}`
                    : `${currencySymbol}${budget}`, // Pass budget value dynamically
              },
            }}
            sx={{
              color: "#990066",
            }}
          />
        </Box>

        {/* Description */}
        <Box className="budget-slider-description">
          <p>
            The maximum amount per person including round-trip flight tickets,
            accommodation in selected cities, an optional travel guide.
          </p>
        </Box>
      </Box>

      <Box className="step-two-container-travel-options">
        <Box className="step-two-container-travel-date-left">
          <label>Travel date</label>
          <input
            type="date"
            className="step-two-container-travel-date-input"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Set min date to today
          />
        </Box>
        <Box className="step-two-container-travel-date-right">
          <label>Flexibility</label>
          <Box className="step-two-container-flexibility">
            <span className="step-two-counter-flexibilty-value">
              {" "}
              {flexibility} days
            </span>
            <Box className="step-two-flexibility-buttons">
              <button
                onClick={() => setFlexibility(Math.max(0, flexibility - 1))}
                className="step-two-container-flexibility-btn"
              >
                -
              </button>
              <button
                onClick={() => setFlexibility(flexibility + 1)}
                className="step-two-container-flexibility-btn"
              >
                +
              </button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="step-two-container-travellers-container">
        <label className="step-two-travellers-label">No. of Nights</label>
        <Box className="step-two-container-travellers-counter">
          <span className="step-two-counter-travellers-value">
            {nights} Nights
          </span>
          <div className="step-two-travellers-buttons">
            <button
              onClick={() => setNights(Math.max(1, nights - 1))}
              className="step-two-container-travellers-counter-btn"
            >
              -
            </button>
            <button
              onClick={() => setNights(nights + 1)}
              className="step-two-container-travellers-counter-btn"
            >
              +
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default StepTwo;
