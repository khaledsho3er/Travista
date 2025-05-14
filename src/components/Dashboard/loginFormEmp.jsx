import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Typography,
  Box,
  Grid,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../utils/empContext";

const EmpLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useEmployee();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/admin");
    } catch (err) {
      // Check if the error message indicates an inactive account
      if (err.message && err.message.includes("inactive")) {
        setError(
          "Your account is inactive. Please contact your administrator."
        );
      } else {
        setError(err.message || "Login failed");
      }
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
          src="/assets/main-logo.png"
          alt="Travista Logo"
          style={{ width: "100%", height: "auto" }}
        />
      </Grid>

      {/* Form Section */}

      <Box sx={{ my: 4, mx: 2, width: "100%" }}>
        <Typography
          component="h1"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Employee Login
        </Typography>
        <Typography component="p" textAlign="center" sx={{ mb: 4 }}>
          Access your dashboard and internal tools.
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
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
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
            Sign In
          </Button>

          <Box
            sx={{
              mt: 2,
              textAlign: "center",
              fontSize: "0.75rem",
              gap: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link href="#" variant="body2">
              Forgot Password?
            </Link>
            {/* <Link href="/employee/register" variant="body2" color="primary">
              Create Account
            </Link> */}
          </Box>

          <Typography sx={{ mt: 2, textAlign: "center", fontSize: "0.75rem" }}>
            By signing in, I agree to the Company Terms and Privacy Policy.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EmpLoginForm;
