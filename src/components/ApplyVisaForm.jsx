import React, { useState, useEffect } from "react";
import countries from "world-countries";
import axios from "axios";
import VisaDocumentDialog from "./visaDialog";
import SuccessDialog from "./SuccessDialog";

const ApplyForVisaForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showSchengenQuestion, setShowSchengenQuestion] = useState(false);
  const [visaTypes, setVisaTypes] = useState([]);
  const [selectedVisaType, setSelectedVisaType] = useState("");
  const [visaDocuments, setVisaDocuments] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    visaTypes: "",
    previousVisaNumber: "",
    previousVisaExpiry: "",
    passportNumber: "",
    agreedToTerms: false,
    bankStatement: "",
  });

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

  const travelPurposes = [
    "Business",
    "Tourism",
    "Study",
    "Family Visit",
    "Work Visa",
    "Transit",
  ];

  useEffect(() => {
    const fetchVisaTypes = async () => {
      try {
        const res = await axios.get(
          "https://158.220.96.121/api/visa-documents"
        );
        setVisaTypes(res.data);
      } catch (error) {
        console.error("Failed to load visa types", error);
      }
    };

    fetchVisaTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setFormData({ ...formData, country });

    if (schengenCountries.includes(country)) {
      setShowSchengenQuestion(false);
      setFormData((prev) => ({ ...prev, schengenBefore: "N/A" }));
    } else {
      setShowSchengenQuestion(true);
      setFormData((prev) => ({ ...prev, schengenBefore: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVisaType) {
      alert("Please select a visa type.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Submit the form data
      await axios.post("https://158.220.96.121/api/visa-leads", {
        ...formData,
        visaType: selectedVisaType,
      });

      // Fetch the documents for the selected visa type
      const docRes = await axios.get(
        `https://158.220.96.121/api/visa-documents/${selectedVisaType}`
      );
      // Filter only PDF documents and get the fileUrl
      setVisaDocuments(docRes.data);

      // Show the dialog with PDF documents
      setShowDialog(true);

      // Show success dialog after document dialog is closed
      setShowSuccessDialog(true);

      // Reset form
      setFormData({
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
        visaTypes: "",
        previousVisaNumber: "",
        previousVisaExpiry: "",
        passportNumber: "",
        agreedToTerms: false,
        bankStatement: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(error.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <form className="ApplyForVisa-contact-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
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
        <select
          className="form-input"
          name="visaRenewal"
          required
          value={formData.visaRenewal}
          onChange={handleChange}
        >
          <option value="">Do you need visa renewal?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

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

        {/* ✅ Visa Type Selector */}
        <select
          className="form-input"
          required
          value={selectedVisaType}
          onChange={(e) => setSelectedVisaType(e.target.value)}
        >
          <option value="">Select Visa Type</option>
          {visaTypes.map((type) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* ✅ Visa Document Dialog */}
      {showDialog && (
        <VisaDocumentDialog
          documentUrl={visaDocuments}
          onClose={() => setShowDialog(false)}
        />
      )}

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        formType="visa"
      />
    </>
  );
};

export default ApplyForVisaForm;
