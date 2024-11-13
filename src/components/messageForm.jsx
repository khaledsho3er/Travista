import React from "react";

const MessageForm = () => {
  return (
    <form class="contact-form">
      <div class="form-row">
        <input type="text" placeholder="First name" class="form-input" />
        <input type="text" placeholder="Last name" class="form-input" />
      </div>
      <input type="email" placeholder="Email" class="form-input" />
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
      <input type="text" placeholder="Subject" class="form-input" />
      <textarea
        placeholder="Describe how we can help you..."
        class="form-input"
      ></textarea>
      <label class="terms-label">
        <input type="checkbox" /> I agree to terms and privacy policy.
      </label>
      <button type="submit" class="submit-button">
        Send Message
      </button>
    </form>
  );
};
export default MessageForm;
