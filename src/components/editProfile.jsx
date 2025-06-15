import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useUser } from "../utils/userContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userSession, setUserSession, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔄 Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://api.travistasl.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${userSession?.token}`,
            },
          }
        );

        setEditedData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          birthDate: data.birthDate?.split("T")[0] || "",
        });

        // ❌ Do not call setUserSession here — it causes re-renders and resets inputs
      } catch (error) {
        setMessage("Failed to load profile.");
      }
    };

    if (userSession?.token) {
      fetchProfile();
    }
  }, [userSession?.token]); // ✅ depend only on token

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage("");
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        "https://api.travistasl.com/api/users/profile",
        editedData,
        {
          headers: {
            Authorization: `Bearer ${userSession.token}`,
          },
        }
      );

      const updatedUser = response.data;

      setUserSession({ ...userSession, ...updatedUser });
      localStorage.setItem(
        "travista-user",
        JSON.stringify({ ...userSession, ...updatedUser })
      );

      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      setMessage("Failed to update profile.");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!userSession?.token) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
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
          </>
        ) : (
          <>
            <Typography>
              <strong>First Name:</strong> {editedData.firstName}
            </Typography>
            <Typography>
              <strong>Last Name:</strong> {editedData.lastName}
            </Typography>
            <Typography>
              <strong>Email:</strong> {editedData.email}
            </Typography>
            <Typography>
              <strong>Phone Number:</strong> {editedData.phoneNumber}
            </Typography>
            <Typography>
              <strong>Birth Date:</strong>{" "}
              {editedData.birthDate || "Not Specified"}
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

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
