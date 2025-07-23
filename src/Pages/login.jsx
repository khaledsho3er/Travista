import React, { useState } from "react";
import {
  Button,
  TextField,
  Link,
  Typography,
  Box,
  Paper,
  Grid,
  CssBaseline,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/userContext";
import { FaGlobe } from "react-icons/fa";
import PoliciesPopup from "../components/PoliciesPopup";
import { motion } from "framer-motion";

const TravistaSignIn = () => {
  const navigate = useNavigate();
  const { userSession, setUserSession } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setFormData({ ...formData, email: e.target.value.toLowerCase() });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://api.travistasl.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save token in local storage or context
      setUserSession({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        birthDate: data.birthDate,
        token: data.token,
      });

      localStorage.setItem("travista-token", data.token);

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };
  console.log("user session:", userSession);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ my: 4, mx: 2, width: "100%" }}>
            <Typography
              component="h1"
              variant="h4"
              fontWeight="bold"
              textAlign="center"
            >
              Sign In
            </Typography>
            <Typography component="p" textAlign="center" sx={{ mb: 4 }}>
              Manage your booked trips, tours, and profile information.
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
                sx={{ width: { xs: "90%", sm: "50%", borderRadius: "50px" } }}
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
                sx={{ width: { xs: "90%", sm: "50%", borderRadius: "50px" } }}
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <motion.div
                whileHover={{
                  scale: 1.04,
                  borderRadius: "50px",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
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
              </motion.div>
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
                <Link href="/signup" variant="body2" color="primary">
                  Create Account
                </Link>
              </Box>

              <Typography
                sx={{ mt: 2, textAlign: "center", fontSize: "0.75rem" }}
              >
                By signing in, I agree to the{" "}
                <span
                  style={{
                    color: "#750046",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setPoliciesOpen(true)}
                >
                  Travista Terms and Privacy Policy
                </span>
                .
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

export default TravistaSignIn;
