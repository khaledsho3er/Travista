import React from "react";

const ApplyForVisaForm = () => {
  return (
    <form class="ApplyForVisa-contact-form">
      <select class="form-input">
        <option value="Country">Country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="UK">United Kingdom</option>
        <option value="AU">Australia</option>
      </select>
      <div class="form-row">
        <input type="text" placeholder="First name" class="form-input" />
        <input type="text" placeholder="Last name" class="form-input" />
      </div>
      <div class="form-row">
        <select class="form-input country-code">
          <option value="+20">+20</option>
        </select>
        <input
          type="tel"
          placeholder="Phone number"
          class="form-input phone-input"
        />
      </div>

      <label class="terms-label">
        <input type="checkbox" /> I agree to terms and privacy policy.
      </label>
      <button type="submit" class="submit-button">
        Submit
      </button>
    </form>
  );
};
export default ApplyForVisaForm;
