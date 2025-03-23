import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../utils/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloseIcon from "@mui/icons-material/Close";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// Define the background type for each route
const backgroundMap = {
  "/": "dark",
  "/About": "dark",
  "/services": "light",
  "/contact": "dark",
  "/account": "light",
  "/login": "light",
  "/loading": "light",
  "/signup": "light",
  "/packages": "dark",
  "/buildmypackagesteps": "light",
};
function Navbar() {
  const location = useLocation();
  const { userSession } = useUser();
  const [isLightBackground, setIsLightBackground] = useState(true);

  const [scrolling, setScrolling] = useState(false); // Scroll state
  const navigate = useNavigate();
  const handleApplyForVisa = () => {
    navigate("/applyforvisa"); // Navigate to Explore Packages page
  };
  const handleBuildPackageClick = () => {
    navigate("/buildmypackage"); // Navigate to Build My Package page
  };
  const handleAboutUs = () => {
    navigate("/About"); // Navigate to Explore Packages page
  };
  const handleCareers = () => {
    navigate("/careers"); // Navigate to Explore Packages page
  };
  const handleSignIn = () => {
    navigate("/login"); // Navigate to Explore Packages page
  };
  const handleMyAccount = () => {
    navigate("/account"); // Navigate to Explore Packages page
  };
  const [isOpen, setIsOpen] = useState(false);

  // Update navbar state based on route
  useEffect(() => {
    const currentPath = location.pathname;
    const backgroundType = backgroundMap[currentPath] || "dark"; // Default to dark if undefined
    setIsLightBackground(backgroundType === "light");
  }, [location]);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  // Add scroll event listener to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sideList = () => (
    <Box
      sx={{
        width: "auto",
        background: "#142328",
        padding: "20px 35px",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link className="nav-link" to="/packages">
              Packages & Tours <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={handleApplyForVisa}
          >
            <Link className="nav-link" to="/apply">
              Apply for Visa <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={handleBuildPackageClick}
          >
            <Link className="nav-link" to="build-package">
              Build my Package <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={handleAboutUs}
          >
            <Link className="nav-link" to="about">
              Our Story <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={handleCareers}
          >
            <Link className="nav-link" to="offices">
              Our Offices <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={handleCareers}
          >
            <Link className="nav-link" to="careers">
              Careers <ArrowOutwardIcon fontSize="2rem" />
            </Link>
          </Button>
        </Grid>
      </Grid>

      <hr
        style={{
          background: "#26414a",
          border: "1px solid #26414a",
          marginTop: "25px",
        }}
      />
    </Box>
  );

  function BlogSection() {
    return (
      <Box
        className="blog-section"
        sx={{ padding: "20px 35px", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Typography
            variant="h6"
            margin="25px 0"
            color={"#777777"}
            gutterBottom
          >
            Latest blog
          </Typography>

          <Box>
            <Button
              sx={{
                color: "black",
                background: "white",
                borderRadius: "25px",
                p: "10px 20px",
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            >
              Discover Blog +
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* The card for the blog post can be a separate component */}
            <Box
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Box sx={{ borderRadius: "8px" }}>
                <img
                  src="assets/blog-image.png"
                  alt="Blog"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  5 Min read • Mar 11, 2023
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight={800}>
                  The ultimate travel guide for your trip to Paris
                </Typography>
                <Typography variant="body2" color="#777777">
                  Unveiling the City of Love, Croissants, and Adventure! Whether
                  you're a first-time visitor or a seasoned Parisian
                  aficionado...
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* The card for the blog post can be a separate component */}
            <Box
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Box sx={{ borderRadius: "8px" }}>
                <img
                  src="assets/blog-image.png"
                  alt="Blog"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
              <Box>
                <Typography variant="caption" display="block" gutterBottom>
                  5 Min read • Mar 11, 2023
                </Typography>
                <Typography variant="h6" gutterBottom fontWeight={800}>
                  The ultimate travel guide for your trip to Paris
                </Typography>
                <Typography variant="body2" color="#777777">
                  Unveiling the City of Love, Croissants, and Adventure! Whether
                  you're a first-time visitor or a seasoned Parisian
                  aficionado...
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 10 }}>
      {!isOpen && (
        <AppBar
          // Sticky navbar
          sx={{
            padding: "10px 5%",
            backgroundColor: scrolling
              ? "rgba(0, 0, 0, 0.2)" // Semi-transparent background when scrolling
              : "transparent", // Transparent background when at top
            transition: "background-color 0.3s ease-in-out",
            boxShadow: "none",
            backdropFilter: scrolling ? "blur(10px)" : "none", // Optional: Adds blur effect
          }}
          className="navbar"
        >
          <Toolbar
            className="toolbar"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ maxWidth: "205px", zIndex: 0 }}>
              <Link to="/" className="nav-link">
                <img
                  src={
                    isLightBackground
                      ? "/assets/main-logo.png"
                      : "/assets/logo-white.png"
                  }
                  alt="Logo"
                  style={{ height: "60px" }}
                />
              </Link>
            </Box>

            <Box sx={{ display: "flex", gap: "25px" }}>
              <Link to="/packages" className="nav-link">
                <Button
                  className="navbar-hide"
                  color="inherit"
                  sx={{
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Changes to white on scroll
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  Packages & Tours
                </Button>
              </Link>

              {userSession.firstName ? (
                <Button
                  color="inherit"
                  onClick={handleMyAccount}
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.5rem",
                    border: "1px solid",
                    borderRadius: "20px",
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white",
                    borderColor: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Border color change
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      color: scrolling
                        ? "white"
                        : isLightBackground
                        ? "black"
                        : "white", // Icon color change
                      borderColor: scrolling
                        ? "1px solid white"
                        : "1px solid white",
                      transition: "color 0.3s ease-in-out",
                    }}
                  />
                  {userSession?.firstName
                    ? `Welcome, ${userSession?.firstName}`
                    : "Welcome"}{" "}
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleSignIn}
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.5rem",
                    border: "1px solid",
                    borderRadius: "20px",
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white",
                    borderColor: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Border color change
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      color: scrolling
                        ? "white"
                        : isLightBackground
                        ? "black"
                        : "white", // Icon color change
                      borderColor: scrolling
                        ? "1px solid white"
                        : "1px solid white",
                      transition: "color 0.3s ease-in-out",
                    }}
                  />
                  Sign In
                </Button>
              )}

              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon
                  sx={{
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Menu icon changes dynamically
                    fontSize: "2rem",
                    transition: "color 0.3s ease-in-out",
                  }}
                />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: "auto",
            height: "90vh",
            background: "#142328",
            padding: "0 4%",
          }}
          className="inner-navbar"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 35px",
            }}
            className="inner-toolbar"
          >
            <Box sx={{ maxWidth: "205px" }}>
              <Link to="/" className="nav-link">
                <img
                  src="assets/logo-white.png"
                  alt="Logo"
                  style={{ width: "100%" }}
                />
              </Link>
            </Box>

            <Box>
              {userSession.firstName ? (
                <Button
                  color="inherit"
                  onClick={handleMyAccount}
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.5rem",
                    border: "1px solid",
                    borderRadius: "20px",
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white",
                    borderColor: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Border color change
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      color: scrolling
                        ? "white"
                        : isLightBackground
                        ? "black"
                        : "white", // Icon color change
                      borderColor: scrolling
                        ? "1px solid white"
                        : "1px solid white",
                      transition: "color 0.3s ease-in-out",
                    }}
                  />
                  {userSession?.firstName
                    ? `Welcome, ${userSession?.firstName}`
                    : "Welcome"}
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleSignIn}
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.5rem",
                    border: "1px solid",
                    borderRadius: "20px",
                    color: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white",
                    borderColor: scrolling
                      ? "white"
                      : isLightBackground
                      ? "black"
                      : "white", // Border color change
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      color: scrolling
                        ? "white"
                        : isLightBackground
                        ? "black"
                        : "white", // Icon color change
                      borderColor: scrolling
                        ? "1px solid white"
                        : "1px solid white",
                      transition: "color 0.3s ease-in-out",
                    }}
                  />
                  Sign In
                </Button>
              )}

              <IconButton
                edge="start"
                style={{ margin: " 0 16px" }}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(false)}
              >
                <CloseIcon sx={{ color: "white", fontSize: "2rem" }} />
              </IconButton>
            </Box>
          </Box>

          {sideList()}

          <BlogSection />
        </div>
      </Drawer>
    </Box>
  );
}

export default Navbar;
