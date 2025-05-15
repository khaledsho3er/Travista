import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Social Media Icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMediaManagement = () => {
  const [socials, setSocials] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [socialData, setSocialData] = useState({ url: "" });

  useEffect(() => {
    fetchSocials();
  }, []);

  // Fetch all social media links
  const fetchSocials = async () => {
    try {
      const response = await axios.get(
        "https://158.220.96.121/api/social-media"
      );
      setSocials(response.data);
    } catch (error) {
      toast.error("Error fetching social media links");
    }
  };

  // Open modal for adding/editing
  const handleOpen = (social = null) => {
    setSelectedSocial(social);
    setSocialData(social ? { url: social.url } : { url: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSocial(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setSocialData({ ...socialData, url: e.target.value });
  };

  // Determine platform based on URL
  const getPlatformFromUrl = (url) => {
    if (url.includes("facebook.com")) return "Facebook";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("twitter.com")) return "Twitter";
    if (url.includes("x.com")) return "X";
    if (url.includes("linkedin.com")) return "LinkedIn";
    if (url.includes("youtube.com")) return "YouTube";
    if (url.includes("tiktok.com")) return "Tiktok";
    return "Website"; // Default if unknown
  };

  // Get the correct icon
  const getIcon = (platform) => {
    switch (platform) {
      case "Facebook":
        return <FaFacebook size={24} color="#1877F2" />;
      case "Instagram":
        return <FaInstagram size={24} color="#E1306C" />;
      case "Twitter":
        return <FaTwitter size={24} color="#1DA1F2" />;
      case "LinkedIn":
        return <FaLinkedin size={24} color="#0A66C2" />;
      case "YouTube":
        return <FaYoutube size={24} color="#FF0000" />;
      case "Tiktok":
        return <FaTiktok size={24} color="#000000" />;
      case "X":
        return <FaXTwitter size={24} color="#000000" />;
      default:
        return <FaGlobe size={24} color="#555" />;
    }
  };

  // Add a function to check if platform already exists
  const platformExists = (url) => {
    const platform = getPlatformFromUrl(url);
    return socials.some(
      (social) =>
        social.platform.toLowerCase() === platform.toLowerCase() &&
        (!selectedSocial || social.socialId !== selectedSocial.socialId)
    );
  };

  // Save (Add or Update) social media link
  const handleSave = async () => {
    if (!socialData.url) {
      toast.warning("Please enter a URL.");
      return;
    }

    const platform = getPlatformFromUrl(socialData.url);

    // Check if platform already exists (for new entries only)
    if (!selectedSocial && platformExists(socialData.url)) {
      toast.error(
        `A link for ${platform} already exists. Please edit the existing one instead.`
      );
      return;
    }

    try {
      if (selectedSocial) {
        await axios.put(
          `https://158.220.96.121/api/social-media/${selectedSocial.socialId}`,
          { url: socialData.url, platform }
        );
        toast.success("Social media link updated successfully!");
      } else {
        await axios.post("https://158.220.96.121/api/social-media", {
          url: socialData.url,
          platform,
        });
        toast.success("Social media link added successfully!");
      }
      fetchSocials();
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(`This platform already exists in the database.`);
      } else {
        toast.error("Error saving social media link");
      }
    }
  };

  // Delete a social media link
  const handleDelete = async (socialId) => {
    if (
      !window.confirm("Are you sure you want to delete this social media link?")
    )
      return;
    try {
      await axios.delete(`https://158.220.96.121/api/social-media/${socialId}`);
      toast.success("Social media link deleted successfully!");
      fetchSocials();
    } catch (error) {
      toast.error("Error deleting social media link");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Social Media Management
      </Typography>

      {/* Add Social Media Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add Social Media
      </Button>

      {/* Social Media Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Platform</strong>
              </TableCell>
              <TableCell>
                <strong>URL</strong>
              </TableCell>
              <TableCell>
                <strong>Icon</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {socials.map((social) => (
              <TableRow key={social.socialId}>
                <TableCell>{social.socialId}</TableCell>
                <TableCell>{social.platform}</TableCell>
                <TableCell>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.url}
                  </a>
                </TableCell>
                <TableCell>{getIcon(social.platform)}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(social)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(social.socialId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Social Media Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedSocial ? "Edit Social Media" : "Add Social Media"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="URL"
            name="url"
            value={socialData.url}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedSocial ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default SocialMediaManagement;
