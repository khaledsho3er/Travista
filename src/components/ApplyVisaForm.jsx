import React, { useState, useEffect } from "react";
import axios from "axios";
import VisaDocumentDialog from "./visaDialog";
import SuccessDialog from "./SuccessDialog";
import { Button } from "@mui/material";

const ApplyForVisaForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [showSchengenQuestion, setShowSchengenQuestion] = useState(false);
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
    additionalFiles: [],
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
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://158.220.96.121/api/visa-documents"
        );
        setCountryOptions(res.data);
      } catch (error) {
        console.error("Failed to load countries", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "purpose") {
      const invitationValue = value === "Tourism" ? "No" : "";
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        invitation: invitationValue,
      }));
    } else if (name === "visaTypes") {
      setSelectedVisaType(value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  const getInvitationLabel = () => {
    switch (formData.purpose) {
      case "Study":
        return "Do you have a university letter?";
      case "Work Visa":
        return "Do you have a work contract?";
      case "Business":
      case "Family Visit":
        return "Do you have an invitation?";
      default:
        return "";
    }
  };
  const handleAdditionalFilesChange = (event) => {
    const files = Array.from(event.target.files);

    // Limit to 10 files total
    if (formData.additionalFiles.length + files.length > 10) {
      alert("You can upload a maximum of 10 files");
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalFiles: [...prevFormData.additionalFiles, ...files],
    }));
  };

  // Add a function to remove a file
  const handleRemoveFile = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      additionalFiles: prevFormData.additionalFiles.filter(
        (_, i) => i !== index
      ),
    }));
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
      // Create FormData object for file uploads
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "additionalFiles" && key !== "agreedToTerms") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add visaType separately
      formDataToSend.append("visaType", selectedVisaType);
      formDataToSend.append("agreedToTerms", formData.agreedToTerms.toString());

      // Add each file to FormData
      formData.additionalFiles.forEach((file, index) => {
        formDataToSend.append(`additionalFiles`, file);
      });

      // Submit the form data with files
      await axios.post(
        "https://158.220.96.121/api/visa-leads",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Fetch the documents for the selected visa type
      const docRes = await axios.get(
        `https://158.220.96.121/api/visa-documents/${selectedCountry}`
      );
      setVisaDocuments(docRes.data);

      // Show the dialog with PDF documents
      setShowDialog(true);
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
        additionalFiles: [],
      });
      setSelectedCountry("");
      setSelectedVisaType("");
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
          {countryOptions.map((country) => (
            <option key={country._id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          className="form-input"
          name="purpose"
          required
          value={formData.purpose}
          onChange={handleChange}
        >
          <option value="">Purpose of Travel</option>
          {travelPurposes.map((purpose) => (
            <option key={purpose} value={purpose}>
              {purpose}
            </option>
          ))}
        </select>

        {formData.purpose !== "Tourism" && (
          <select
            className="form-input"
            name="invitation"
            required
            value={formData.invitation}
            onChange={handleChange}
          >
            <option value="">{getInvitationLabel()}</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        )}

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
          value={formData.travelDate}
        />

        <select
          className="form-input"
          name="jobStatus"
          required
          onChange={handleChange}
          value={formData.jobStatus}
        >
          <option value="">Select Job Status</option>
          <option value="Employee">Employee</option>
          <option value="Company Owner">Company Owner</option>
          <option value="Retired">Retired</option>
          <option value="Student">Student</option>
          <option value="Freelance">Freelance</option>
          <option value="Unemployed">Unemployed</option>
        </select>

        <select
          className="form-input"
          name="visaRenewal"
          required
          value={formData.visaRenewal}
          onChange={handleChange}
        >
          <option value="">Is this your first time applying?</option>
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

        <select
          className="form-input"
          name="visaTypes"
          required
          value={selectedVisaType}
          onChange={handleChange}
        >
          <option value="">Select Visa Type</option>
          <option value="Normal Visa">Normal Visa</option>
          <option value="E-Visa">E-Visa</option>
        </select>
        <label className="file-label">
          Additional Files
          <input
            type="file"
            name="additionalFiles"
            onChange={handleAdditionalFilesChange}
            multiple
            hidden
          />
          <Button variant="contained" component="span" className="file-input">
            Upload
          </Button>
          {formData.additionalFiles.length > 0 ? (
            <div className="file-list">
              {formData.additionalFiles.map((file, index) => (
                <p key={index}>
                  {file.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="remove-file-btn"
                  >
                    ×
                  </button>
                </p>
              ))}
            </div>
          ) : (
            <p>No files selected</p>
          )}
          <small>Maximum 10 files allowed</small>
        </label>

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

      {showDialog && (
        <VisaDocumentDialog
          documentUrl={visaDocuments}
          onClose={() => setShowDialog(false)}
        />
      )}

      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        formType="visa"
      />
    </>
  );
};

export default ApplyForVisaForm;
