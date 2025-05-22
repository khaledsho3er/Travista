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
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Form submitted with data:", formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      console.log("Password mismatch!");
      return;
    }

    try {
      const response = await fetch("https://158.220.96.121/api/auth/signup", {
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
      });

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
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  size="small"
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  size="small"
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                control={<Checkbox color="primary" />}
                label={
                  <Typography
                    variant="body2"
                    textAlign="left"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    By creating an account, I have read, and I understand and
                    agree to, the Travista Terms of Use and Data Privacy Notice.
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
    </>
  );
};

export default TravistaSignUp;
