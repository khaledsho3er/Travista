import React from "react";
import {Box} from "@mui/material";
function StepThree() {
  return (
    <Box className="BMI-steps-third-Content">
    <h5>Step 3 of 3</h5>
    <h4>Who's in charge?</h4>
    <p>Tell us more about yourself.</p>
    <form >
        <Box className="form-row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
        </Box>
        <input type="email" placeholder="Email" />
        <Box className="form-row-phone">
            <select class="form-input country-code">
                <option value="+20">+20</option>
            </select>
            <input type="text" placeholder="Phone Number" />
        </Box>
    </form>
    </Box>
  );
}

export default StepThree;
