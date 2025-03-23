import React, { useState } from "react";
import countries from "world-countries";
import axios from "axios";

const ApplyForVisaForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
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
    agreedToTerms: false,
    bankStatement: null,
  });

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setFormData({ ...formData, bankStatement: event.target.files[0] });
    } else {
      setFileName("No file chosen");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, agreedToTerms: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    console.log("Data to be submitted:", Object.fromEntries(data.entries()));

    try {
      await axios.post("http://localhost:5000/api/visa-leads", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully");
    } catch (error) {
      console.error("Error submitting application", error);
    }
  };

  return (
    <form className="ApplyForVisa-contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="form-input"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
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
          placeholder="Phone number"
          className="form-input phone-input"
          required
          onChange={handleChange}
        />
      </div>

      <select
        className="form-input"
        name="country"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          handleChange(e);
        }}
        required
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="purpose"
        placeholder="Purpose of Travel"
        className="form-input"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="invitation"
        placeholder="Invitation"
        className="form-input"
        required
        onChange={handleChange}
      />

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

      <label className="form-label">
        Upload Bank Statement (PDF, JPG, PNG)
      </label>
      <div className="file-input">
        <input
          type="file"
          className="form-input"
          accept=".pdf, .jpg, .png"
          required
          onChange={handleFileChange}
        />
      </div>

      <select
        className="form-input"
        name="visaRenewal"
        required
        onChange={handleChange}
      >
        <option value="">Visa Renewal?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label className="terms-label">
        <input
          type="checkbox"
          name="agreedToTerms"
          onChange={handleCheckboxChange}
          required
        />
        I agree to terms and privacy policy.
      </label>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ApplyForVisaForm;
