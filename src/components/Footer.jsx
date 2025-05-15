import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloseIcon from "@mui/icons-material/Close";
import { FaTiktok, FaGlobe } from "react-icons/fa";

import axios from "axios";

function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  // Define all social platforms we want to display
  const allPlatforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: FacebookIcon,
      defaultUrl: "https://facebook.com",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: InstagramIcon,
      defaultUrl: "https://instagram.com",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: XIcon,
      defaultUrl: "https://twitter.com",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: LinkedInIcon,
      defaultUrl: "https://linkedin.com",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: YouTubeIcon,
      defaultUrl: "https://youtube.com",
    },
    {
      id: "tiktok",
      name: "Tiktok",
      icon: FaTiktok,
      defaultUrl: "https://tiktok.com",
      color: "#000000",
    },
  ];

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://158.220.96.121/api/social-media"
        );
        setSocialLinks(response.data);
      } catch (error) {
        console.error("Error fetching social media links:", error);
        // Set empty array to ensure we still render default icons
        setSocialLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setSubscribing(true);
    setSubscribeError("");

    try {
      // Call the newsletter subscription API
      const response = await axios.post(
        "https://158.220.96.121/api/newsletter/subscribe",
        { email }
      );

      // Show success dialog
      setOpenDialog(true);
      // Clear the email field
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setSubscribeError(
        error.response?.data?.message ||
          "Failed to subscribe. Please try again later."
      );
    } finally {
      setSubscribing(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to get URL for a platform
  const getSocialUrl = (platformName) => {
    const platform = platformName.toLowerCase();
    const socialLink = socialLinks.find(
      (link) => link.platform.toLowerCase() === platform
    );

    if (socialLink) {
      return socialLink.url;
    }

    // Return default URL if not found in database
    const defaultPlatform = allPlatforms.find(
      (p) => p.id === platform || p.name.toLowerCase() === platform
    );
    return defaultPlatform ? defaultPlatform.defaultUrl : "#";
  };
  // Get the correct icon for a platform
  const getIcon = (platform) => {
    const platformObj = allPlatforms.find(
      (p) =>
        p.name.toLowerCase() === platform.toLowerCase() ||
        p.id === platform.toLowerCase()
    );

    if (platformObj) {
      const Icon = platformObj.icon;
      return <Icon size={24} color={platformObj.color} />;
    }

    // Default icon for unknown platforms
    return <FaGlobe size={24} color="#555" />;
  };
  // Render all social media icons
  const renderSocialIcons = () => {
    // First, render all predefined platforms
    const renderedPlatforms = allPlatforms.map((platform) => {
      const url = getSocialUrl(platform.name);
      const Icon = platform.icon;

      return (
        <a
          key={platform.id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Icon size={24} color={platform.color} />
        </a>
      );
    });

    // Then, add any additional platforms from the database that aren't in our predefined list
    const predefinedPlatformNames = allPlatforms.map((p) =>
      p.name.toLowerCase()
    );

    const additionalPlatforms = socialLinks
      .filter(
        (link) => !predefinedPlatformNames.includes(link.platform.toLowerCase())
      )
      .map((link) => (
        <a
          key={link._id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {getIcon(link.platform)}
        </a>
      ));

    return [...renderedPlatforms, ...additionalPlatforms];
  };
  return (
    <Box className="footer">
      <Box className="footer-title">
        <Typography variant="h4" fontWeight={600}>
          Join our traveler's club.
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!subscribeError}
          helperText={subscribeError}
          sx={{
            width: "100%",
          }}
        />
        <Button
          className="btn btn-primary btn-black"
          onClick={handleSubscribe}
          disabled={subscribing}
          sx={{
            color: "white",
            backgroundColor: "#000",
            "&:hover": {
              backgroundColor: "var(--maroon)",
            },
            "&:disabled": {
              color: "rgba(255, 255, 255, 0.5)",
              backgroundColor: "#555",
            },
            padding: "10px 20px",
            borderRadius: "4px",
            minWidth: "120px",
          }}
        >
          {subscribing ? "Subscribing..." : "Subscribe"}
        </Button>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {loading ? <CircularProgress size={24} /> : renderSocialIcons()}
        </Box>
      </Box>

      <List>
        <ListItem>
          <Typography variant="body1" color="#777777">
            Explore
          </Typography>
        </ListItem>
        <ListItem>
          <Link to="/packages">Packages & Tours</Link>
        </ListItem>
        <ListItem>
          <Link to="/applyforvisa">Apply for Visa</Link>
        </ListItem>
        <ListItem>
          <Link to="/buildmypackage">Build my package</Link>
        </ListItem>
        <ListItem>
          <Link to="/About">About</Link>
        </ListItem>
        <ListItem>
          <Link to="/contactus">Offices</Link>
        </ListItem>
        <ListItem>
          <Link to="/Blogs">Blog</Link>
        </ListItem>
        <ListItem>
          <Link to="/careers">Careers</Link>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <Typography variant="body1" color="#777777">
            Support
          </Typography>
        </ListItem>
        <ListItem>
          <Link to="/help">Help Center</Link>
        </ListItem>
        <ListItem>
          <Link to="/faqs">FAQs</Link>
        </ListItem>
        <ListItem>
          <Link to="/policies">Privacy Policy</Link>
        </ListItem>
        <ListItem>
          <Link to="/terms&conditions">Terms & Conditions</Link>
        </ListItem>
        <ListItem>
          <Link to="/cookiepolicy">Cookie Policy</Link>
        </ListItem>
        <ListItem>
          <Link to="/contactus">Contact</Link>
        </ListItem>
      </List>

      <Box
        className="rights"
        sx={{
          position: "absolute",
          bottom: "10px",
          width: "90%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography color="#777777">
          © {new Date().getFullYear()} Travista. All rights reserved.
        </Typography>
        <Link
          to="https://www.youngproductionss.com/"
          style={{ textDecoration: "none" }}
        >
          <Typography color="#777777">
            © Powered By Young Productions.
          </Typography>
        </Link>
      </Box>

      {/* Newsletter Subscription Success Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            maxWidth: "400px",
            padding: "16px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px 0 24px",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Subscription Successful
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ padding: "24px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 128, 0, 0.1)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <img
                src="/assets/mail.gif"
                alt="Email Sent"
                style={{ width: "100%", height: "100%" }}
              />{" "}
            </Box>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Thank you for subscribing to our newsletter!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You will now receive the latest travel offers, destination
              insights, and exclusive deals directly to your inbox.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ padding: "0 24px 16px 24px", justifyContent: "center" }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              borderRadius: "24px",
              minWidth: "120px",
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Footer;
