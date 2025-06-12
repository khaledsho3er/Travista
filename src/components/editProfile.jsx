import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useUser } from "../utils/userContext"; // Import User Context
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userSession, setUserSession, logout } = useUser(); // Get user session & logout function
  const [isEditing, setIsEditing] = useState(false);
  const [setIsLoggingOut] = useState(false); // Loading state for logout
  const [editedData, setEditedData] = useState({
    firstName: userSession?.firstName || "",
    lastName: userSession?.lastName || "",
    email: userSession?.email || "",
    phoneNumber: userSession?.phoneNumber || "",
    birthDate: userSession?.birthDate?.split("T")[0] || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage(""); // Clear any previous messages
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        `https://api.travistasl.com/api/users/${userSession._id}`, // Corrected endpoint
        editedData,
        {
          headers: {
            Authorization: `Bearer ${userSession.token}`, // Send token
          },
          withCredentials: true,
        }
      );

      // ✅ Update user session in context & localStorage
      setUserSession({ ...userSession, user: response.data.updatedUser });
      localStorage.setItem(
        "userSession",
        JSON.stringify({ ...userSession, user: response.data.updatedUser })
      );

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user", error);
      setMessage("Failed to update profile. Please try again.");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true); // Show loading screen
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate logout delay
    logout(); // Clear user session
    navigate("/"); // Redirect to homepage
  };

  return (
    <>
      <Box sx={{ maxWidth: "500px", margin: "auto", mt: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Edit Profile
        </Typography>
        {message && (
          <Typography color={message.includes("failed") ? "error" : "green"}>
            {message}
          </Typography>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {isEditing ? (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={editedData.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={editedData.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={editedData.phoneNumber}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Birth Date"
                name="birthDate"
                type="date"
                value={editedData.birthDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading}
                sx={{ mt: 2, background: "#142328" }}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Typography>
                <strong>First Name:</strong> {userSession.firstName}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {userSession.lastName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {userSession.email}
              </Typography>
              <Typography>
                <strong>Phone Number:</strong> {userSession.phoneNumber}
              </Typography>
              <Typography>
                <strong>Birth Date:</strong>{" "}
                {userSession.birthDate || "Not Specified"}
              </Typography>
              <Button
                variant="contained"
                onClick={handleEditToggle}
                sx={{ mt: 2, background: "#142328" }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

export default EditProfile;
