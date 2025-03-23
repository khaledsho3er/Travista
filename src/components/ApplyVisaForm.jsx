import React, { useState } from "react";
import countries from "world-countries";
import axios from "axios";

const ApplyForVisaForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showSchengenQuestion, setShowSchengenQuestion] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    country: "",
    purpose: "",
    invitation: "",
    schengenBefore: "",
    travelDate: "",
    jobStatus: "",
    visaRenewal: "",
    previousVisaNumber: "",
    previousVisaExpiry: "",
    passportNumber: "",
    agreedToTerms: false,
    bankStatement: "",
  });

  // ✅ List of Schengen Countries
  const schengenCountries = [
    "Austria",
    "Belgium",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
  ];

  // ✅ Travel Purposes (ENUM)
  const travelPurposes = [
    "Business",
    "Tourism",
    "Study",
    "Family Visit",
    "Work Visa",
    "Transit",
  ];

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Country Selection & Show/Hide Schengen Question
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setFormData({ ...formData, country });

    // ✅ If the country is in Schengen, hide the question
    if (schengenCountries.includes(country)) {
      setShowSchengenQuestion(false);
      setFormData((prev) => ({ ...prev, schengenBefore: "N/A" }));
    } else {
      setShowSchengenQuestion(true);
      setFormData((prev) => ({ ...prev, schengenBefore: "" }));
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);

    try {
      await axios.post("http://localhost:5000/api/visa-leads", formData);
      alert("Application submitted successfully");
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <form className="ApplyForVisa-contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="form-input"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="form-input"
          required
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <select className="form-input country-code">
          <option value="+20">+20</option>
        </select>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          className="form-input phone-input"
          required
          onChange={handleChange}
        />
      </div>

      {/* ✅ Country Selection */}
      <select
        className="form-input"
        name="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      {/* ✅ Purpose of Travel */}
      <select
        className="form-input"
        name="purpose"
        required
        onChange={handleChange}
      >
        <option value="">Purpose of Travel</option>
        {travelPurposes.map((purpose) => (
          <option key={purpose} value={purpose}>
            {purpose}
          </option>
        ))}
      </select>

      {/* ✅ Invitation (Yes/No) */}
      <select
        className="form-input"
        name="invitation"
        required
        onChange={handleChange}
      >
        <option value="">Do you have an Invitation?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {/* ✅ Show "Have you visited Schengen before?" only if NOT a Schengen country */}
      {showSchengenQuestion && (
        <select
          className="form-input"
          name="schengenBefore"
          required
          onChange={handleChange}
        >
          <option value="">Have you visited Schengen before?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      )}

      <input
        type="date"
        name="travelDate"
        className="form-input"
        required
        onChange={handleChange}
      />

      <input
        type="text"
        name="jobStatus"
        placeholder="Job Status"
        className="form-input"
        required
        onChange={handleChange}
      />

      {/* ✅ Bank Statement (Yes/No) */}
      <select
        className="form-input"
        name="bankStatement"
        required
        onChange={handleChange}
      >
        <option value="">Do you have a Bank Statement?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label className="terms-label">
        <input
          type="checkbox"
          name="agreedToTerms"
          onChange={(e) =>
            setFormData({ ...formData, agreedToTerms: e.target.checked })
          }
          required
        />
        I agree to the terms and privacy policy.
      </label>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ApplyForVisaForm;
