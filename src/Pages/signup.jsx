import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  CssBaseline,
  FormControlLabel,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PoliciesPopup from "../components/PoliciesPopup";
import { FaGlobe } from "react-icons/fa";

const TravistaSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);

  const navigate = useNavigate();

  // Password validation rules
  const passwordRules = [
    {
      label: "At least 8 characters",
      test: (pw) => pw.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      label: "At least one lowercase letter",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      label: "At least one number",
      test: (pw) => /[0-9]/.test(pw),
    },
    {
      label: "At least one special symbol",
      test: (pw) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const passwordValidation = passwordRules.map((rule) =>
    rule.test(formData.password)
  );
  const allValid = passwordValidation.every(Boolean);

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setFormData({ ...formData, email: e.target.value.toLowerCase() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "password") {
      setShowPasswordValidation(e.target.value.length > 0);
    }
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "All fields are required.";
    }
    // Email format
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    // Password rules
    const passwordValidation = passwordRules.map((rule) =>
      rule.test(formData.password)
    );
    if (!passwordValidation.every(Boolean)) {
      return "Password does not meet all requirements.";
    }
    // Password match
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match!";
    }
    // Checkbox
    if (!checkboxChecked) {
      return "You must agree to the Terms of Use and Data Privacy Notice.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    console.log("Form submitted with data:", formData);

    try {
      const response = await fetch(
        "https://api.travistasl.com/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            birthDate: formData.birthDate || null,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) throw new Error(data.message || "Signup failed");

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <>
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={5}
          sx={{
            backgroundImage: "url(/assets/Image.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "30vh", sm: "100vh" },
          }}
        ></Grid>

        <Grid
          item
          xs={12}
          sm={8}
          md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Box
            sx={{
              maxWidth: 560,
              width: "100%",
              mx: "auto",
              textAlign: "center",
              padding: 4,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.8rem", sm: "2rem" } }}
            >
              Create Account
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Create an account to manage your booked trips, tours, and profile
              information.
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                  mb: 2,
                }}
              >
                {error && (
                  <Box
                    sx={{
                      color: "#ff3333",
                      background: "rgba(255,0,0,0.08)",
                      borderRadius: "12px",
                      padding: "12px 16px",
                      mt: 1,
                      mb: 2,
                      fontWeight: 500,
                      fontSize: "1rem",
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                      borderLeft: "4px solid #ff3333",
                      maxWidth: 400,
                      mx: "auto",
                      textAlign: "left",
                    }}
                  >
                    {error}
                  </Box>
                )}
                <TextField
                  size="small"
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
                <TextField
                  size="small"
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{ width: "100%" }}
                />
              </Box>

              <TextField
                size="small"
                margin="normal"
                required
                value={formData.email}
                onChange={handleChange}
                sx={{ width: "100%", mb: 2 }}
                label="Email"
                name="email"
                autoComplete="email"
              />
              <TextField
                size="small"
                margin="normal"
                required
                sx={{ width: "100%", mb: 2 }}
                label="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+20</InputAdornment>
                  ),
                }}
              />

              <TextField
                size="small"
                margin="normal"
                required
                sx={{ width: "100%", mb: 2 }}
                label="Password"
                name="password"
                type={showPassword.password ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("password")}
                      >
                        {showPassword.password ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showPasswordValidation && (
                <Box
                  sx={{
                    position: { xs: "static", md: "absolute" },
                    top: { md: "454px" },
                    right: { md: "820px" },
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    boxShadow: 2,
                    p: 2,
                    mb: 2,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: "bold" }}
                  >
                    Password must contain:
                  </Typography>
                  {passwordRules.map((rule, idx) =>
                    passwordValidation[idx] ? (
                      <Box
                        key={rule.label}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "green",
                          mb: 0.5,
                        }}
                      >
                        <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                        <span>{rule.label}</span>
                      </Box>
                    ) : (
                      <Box
                        key={rule.label}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "red",
                          mb: 0.5,
                        }}
                      >
                        <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                        <span>{rule.label}</span>
                      </Box>
                    )
                  )}
                </Box>
              )}
              <TextField
                size="small"
                margin="normal"
                required
                sx={{ width: "100%", mb: 2 }}
                label="Confirm password"
                name="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    color="primary"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    By creating an account, I have read, and I understand and
                    agree to, the
                    <span
                      style={{
                        color: "#750046",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => setPoliciesOpen(true)}
                    >
                      Travista Terms of Use and Data Privacy Notice
                    </span>
                    .
                  </Typography>
                }
                sx={{
                  alignItems: "start",
                  textAlign: "left",
                  mb: 2,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  height: "48px",
                  borderRadius: "24px",
                  backgroundColor: "#333",
                  mt: 2,
                }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" color="textSecondary" mt={2}>
                Already have an account?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    Sign In
                  </Typography>
                </Link>
              </Typography>
              <Typography sx={{ mt: 1, textAlign: "center", fontSize: "1rem" }}>
                <a
                  href="tel://19294"
                  style={{
                    display: "inline-flex", // Use flex to align items
                    alignItems: "center", // Vertically center icon and text
                    textDecoration: "none",
                    color: "#222", // Make it a bit darker for visibility
                    fontWeight: "bold", // Make the number stand out
                    padding: "6px 14px", // Some padding for click area
                    borderRadius: "8px", // Rounded corners
                    gap: "8px", // Space between icon and number
                    fontSize: "1.1rem",
                  }}
                >
                  <FaGlobe size={23} />
                  <span>19294</span>
                </a>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <PoliciesPopup
        open={policiesOpen}
        onClose={() => setPoliciesOpen(false)}
      />
    </>
  );
};

export default TravistaSignUp;
