import React, { useState } from "react";
import SuccessDialog from "./SuccessDialog";

const MessageForm = ({ type }) => {
  const [formData, setFormData] = useState({
    type: type, // "contactUs" or "faq"
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreedToTerms: false,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setFormData({
      type: type,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      agreedToTerms: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.travistasl.com/api/form-lead/submit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      // Reset form on success
      resetForm();

      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.message || "Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}

        <div className="form-row">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="form-input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="form-input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="form-row">
          <select className="form-input country-code" disabled>
            <option value="+20">+20</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="form-input phone-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Describe how we can help you..."
          className="form-input"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <label className="terms-label">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required
          />{" "}
          I agree to terms and privacy policy.
        </label>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseDialog}
        formType={type === "contactUs" ? "contact" : "review"}
      />
    </>
  );
};

export default MessageForm;
