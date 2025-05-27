import React, { useState, useEffect } from "react";
import axios from "axios";
import VisaDocumentDialog from "./visaDialog";
import SuccessDialog from "./SuccessDialog";
import { Button } from "@mui/material";
import { Description, Image, Close } from "@mui/icons-material";

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
    visaType: "",
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
    } else if (name === "visaType") {
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
      setFormData((prev) => ({ ...prev, schengenBefore: "No" })); // <-- change here
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
  const handleAdditionalFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.additionalFiles.length + files.length > 10) {
      alert("You can upload a maximum of 10 files");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      additionalFiles: [...prev.additionalFiles, ...files],
    }));
  };

  const handleRemoveFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalFiles: prev.additionalFiles.filter((_, i) => i !== index),
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
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "additionalFiles" && key !== "agreedToTerms") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append agreedToTerms as string
      formDataToSend.append("agreedToTerms", formData.agreedToTerms.toString());

      formData.additionalFiles.forEach((file) => {
        formDataToSend.append("additionalFiles", file);
      });
      console.log("Form Data to submit:");
      for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Submit visa lead
      await axios.post(
        "https://158.220.96.121/api/visa-leads",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      try {
        // Try fetching visa document
        const docRes = await axios.get(
          `https://158.220.96.121/api/visa-documents/${selectedCountry}`
        );
        console.log("Document response:", docRes);
        if (docRes.data) {
          setVisaDocuments(docRes.data);
          console.log("Visa Documents:", docRes.data);
          setShowDialog(true);
        } else {
          console.warn(`No matching document found for ${selectedCountry}`);
        }
      } catch (docErr) {
        console.error("Document fetch error:", docErr);
        // Don’t block submission just because document fetch fails
      }

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
        visaType: "",
        previousVisaNumber: "",
        previousVisaExpiry: "",
        passportNumber: "",
        agreedToTerms: false,
        bankStatement: "",
        additionalFiles: [],
      });
      setSelectedCountry("");
      setSelectedVisaType("");
    } catch (err) {
      console.error("Submission error:", err);

      if (err.response) {
        const { status, data } = err.response;

        // Backend provided validation error
        if (status === 400 && data.errors) {
          const detailedErrors = Object.entries(data.errors)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join("\n");
          setError(`Validation error:\n${detailedErrors}`);
        } else {
          setError(
            data.message ||
              "Failed to submit application. Please verify your inputs."
          );
        }
      } else if (err.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError("Unexpected error: " + err.message);
      }
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
          <option value="">Select Your Destination</option>
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
          name="visaType"
          value={selectedVisaType}
          required
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Visa Type</option>
          <option value="Normal Visa">Normal Visa</option>
          <option value="E-Visa">E-Visa</option>
        </select>
        {/* Styled File Upload Area */}
        <div
          style={{
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            transition: "all 0.3s ease",
          }}
          onClick={() =>
            document.getElementById("additionalFilesInput").click()
          }
        >
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#555" }}>
              Additional Files
            </h4>
            <p style={{ margin: "0", color: "#888", fontSize: "14px" }}>
              Click to browse or drop files here
            </p>
            <small
              style={{ display: "block", marginTop: "5px", color: "#999" }}
            >
              Maximum 10 files allowed
            </small>
          </div>

          <input
            id="additionalFilesInput"
            type="file"
            multiple
            hidden
            name="additionalFiles"
            onChange={handleAdditionalFilesChange}
          />

          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <Button
              variant="contained"
              component="span"
              style={{
                backgroundColor: "#4a90e2",
                color: "white",
                padding: "8px 16px",
              }}
            >
              Upload Files
            </Button>
          </div>

          {formData.additionalFiles.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              {formData.additionalFiles.map((file, index) => {
                // Determine file type for icon
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
                const isPdf = /\.pdf$/i.test(file.name);

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100px",
                      position: "relative",
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* File icon based on type */}
                    <div style={{ fontSize: "32px", marginBottom: "5px" }}>
                      {isImage ? (
                        <Image style={{ color: "#4caf50", fontSize: "32px" }} />
                      ) : isPdf ? (
                        <Description
                          style={{ color: "#f44336", fontSize: "32px" }}
                        />
                      ) : (
                        <Description
                          style={{ color: "#9e9e9e", fontSize: "32px" }}
                        />
                      )}
                    </div>

                    {/* File name with ellipsis */}
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.name}
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "#ff5252",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    >
                      <Close style={{ fontSize: "14px" }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {formData.additionalFiles.length === 0 && (
            <div
              style={{
                textAlign: "center",
                color: "#aaa",
                padding: "20px 0",
              }}
            >
              No files selected
            </div>
          )}
        </div>

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

      {showDialog && visaDocuments.length > 0 && (
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
