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

const TravistaSignIn = () => {
  const navigate = useNavigate();
  const { userSession, setUserSession } = useUser();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "http://api.travistasl.com/api/users/login",
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
        email: data.email,
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
              <TextField
                size="small"
                margin="normal"
                required
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
                required
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

              {error && <Typography color="error">{error}</Typography>}

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
                <Link href="/signup" variant="body2" color="primary">
                  Create Account
                </Link>
              </Box>

              <Typography
                sx={{ mt: 2, textAlign: "center", fontSize: "0.75rem" }}
              >
                By signing in, I agree to the Travista Terms and Privacy Policy.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TravistaSignIn;
