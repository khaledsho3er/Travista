import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
  CssBaseline,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmpRegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    phone: "",
    empId: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/empauth/register",
        formData,
        { withCredentials: true }
      );
      setSuccess("Registration successful!");
      setError("");
      setFormData({
        email: "",
        password: "",
        username: "",
        name: "",
        phone: "",
        empId: "",
      });
      setTimeout(() => {
        navigate("/employee/login");
      }, 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <CssBaseline />

      <Grid item xs={12} sm={4} md={6} lg={8}>
        <img
          src="/Assets/main-logo.png"
          alt="Travista Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>

      <Box sx={{ my: 4, mx: 2, width: "100%" }}>
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Employee Registration
        </Typography>
        <Typography component="p" textAlign="center" sx={{ mb: 4 }}>
          Join the internal portal with your credentials.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="empId"
            label="Employee ID"
            value={formData.empId}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            size="small"
            margin="normal"
            required
            sx={{ width: { xs: "90%", sm: "50%" } }}
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Error and Success */}
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mt: 1 }}>
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              width: { xs: "90%", sm: "50%" },
              borderRadius: "50px",
              background: "#142328",
            }}
          >
            Register
          </Button>

          <Link
            href="/employee/login"
            variant="body2"
            sx={{ mt: 2, fontSize: "0.9rem" }}
          >
            Already have an account? Sign in here.
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default EmpRegistrationForm;
