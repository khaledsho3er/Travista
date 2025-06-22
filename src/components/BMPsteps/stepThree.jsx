import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useUser } from "../../utils/userContext";

function StepThree({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  countryCode,
  setCountryCode,
}) {
  const { userSession } = useUser();
  useEffect(() => {
    if (userSession) {
      setFirstName(userSession.firstName || "");
      setLastName(userSession.lastName || "");
      setEmail(userSession.email || "");
      setPhoneNumber(userSession.phoneNumber?.replace(/^\+?\d{1,3}/, "") || "");
    }
  }, [userSession, setFirstName, setLastName, setEmail, setPhoneNumber]);

  return (
    <Box className="BMI-steps-third-Content">
      <h5>Step 3 of 3</h5>
      <h4>Who's in charge?</h4>
      <p>Tell us more about yourself.</p>
      <form>
        <Box className="form-row">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Box>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Box className="form-row-phone">
          <select
            className="form-input country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+20">+20</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+33">+33</option>
            <option value="+49">+49</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Box>
      </form>
    </Box>
  );
}

export default StepThree;
