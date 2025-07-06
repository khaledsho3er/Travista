import React, { useState, useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import currencyCodes from "currency-codes";
import { Country, State } from "country-state-city";

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
function StepTwo({
  departureCountry,
  setDepartureCountry,
  departureCity,
  setDepartureCity,
  travellers,
  setTravellers,
  budget,
  setBudget,
  currency,
  setCurrency,
  travelDate,
  setTravelDate,
  flexibility,
  setFlexibility,
  nights,
  setNights,
}) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("€");
  const [currencyList, setCurrencyList] = useState([]);

  // Set countries from country-state-city package
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Set states when country changes
  useEffect(() => {
    if (departureCountry) {
      const selectedCountry = countries.find(
        (c) => c.name === departureCountry
      );
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      } else {
        setStates([]);
      }
    } else {
      setStates([]);
    }
    setDepartureCity(""); // Reset state when country changes
  }, [departureCountry, setDepartureCity, countries]);

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
        >
          <option value="">Departure country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <select
          className="step-two-container-dropdown"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          disabled={!departureCountry}
        >
          <option value="">Departure state</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.name}>
              {state.name}
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
          <option value="EGP">Egyptian Pound (EGP)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="AED">UAE Dirham (AED)</option>
          <option value="SAR">Saudi Riyal (SAR)</option>
          <option value="EUR">Euro (EUR)</option>
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
            max={currency === "EGP" ? 500000 : 100000}
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
