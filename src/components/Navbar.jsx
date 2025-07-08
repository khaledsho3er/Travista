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
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../utils/userContext";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
// Define the background type for each route
// const backgroundMap = {
//   "/": "dark",
//   "/About": "dark",
//   "/services": "light",
//   "/contactus": "dark",
//   "/account": "light",
//   "/login": "dark",
//   "/loading": "light",
//   "/signup": "dark",
//   "/packages": "dark",
//   "/buildmypackagesteps": "light",
//   "/Blogs": "light",
//   "/singleblog": "light",
//   "/applyforvisa": "dark",
//   "/404": "light",
// };
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userSession } = useUser();

  const [isLightBackground, setIsLightBackground] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errorMsg] = useState("");
  useEffect(() => {
    const path = location.pathname;

    const dynamicBackgroundMap = [
      { pattern: /^\/$/, type: "dark" },
      { pattern: /^\/about$/i, type: "dark" },
      { pattern: /^\/services$/i, type: "light" },
      { pattern: /^\/contactus$/i, type: "dark" },
      { pattern: /^\/account$/i, type: "light" },
      { pattern: /^\/login$/i, type: "dark" },
      { pattern: /^\/loading$/i, type: "light" },
      { pattern: /^\/signup$/i, type: "dark" },
      { pattern: /^\/packages$/i, type: "dark" },
      { pattern: /^\/buildmypackagesteps$/i, type: "light" },
      { pattern: /^\/blogs$/i, type: "light" },
      { pattern: /^\/singleblog\/[\w\d]+$/i, type: "light" },
      { pattern: /^\/applyforvisa$/i, type: "dark" },
      { pattern: /^\/404$/, type: "light" },
    ];

    const matched = dynamicBackgroundMap.find((entry) =>
      entry.pattern.test(path)
    );

    const backgroundType = matched?.type || "dark";
    setIsLightBackground(backgroundType === "light");
  }, [location]);

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
  useEffect(() => {
    fetch("https://api.travistasl.com/api/blog/")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  const navigateToBlogs = () => {
    navigate("/Blogs");
  };

  const handleApplyForVisa = () => {
    navigate("/applyforvisa");
  };
  const handleBuildPackageClick = () => {
    navigate("/buildmypackage");
  };
  const handleAboutUs = () => {
    navigate("/About");
  };
  const handleCareers = () => {
    navigate("/careers");
  };
  const handleContact = () => {
    navigate("/contactus");
  };
  const handleSignIn = () => {
    navigate("/login");
  };
  const handleMyAccount = () => {
    navigate("/account");
  };
  // const navigateToBlogs = () => {
  //   navigate("/Blogs");
  // };
  // Update navbar state based on route

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const navColor = scrolling ? "white" : isLightBackground ? "black" : "white";

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
            onClick={handleContact}
          >
            <Link className="nav-link" to="contactus">
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
            <Box
              sx={{
                maxWidth: { xs: "100px", sm: "205px" },
                zIndex: 0,
              }}
            >
              <Link to="/" className="nav-link">
                <img
                  src={
                    isLightBackground
                      ? "/assets/main-logo.png"
                      : "/assets/logo-white.png"
                  }
                  alt="Logo"
                  style={{
                    height: { xs: "45px!important", sm: "60px !important" },
                  }}
                />
              </Link>
            </Box>

            <Box sx={{ display: "flex", gap: "25px" }}>
              <Link to="/packages" className="nav-link">
                <Button
                  className="navbar-hide"
                  color="inherit"
                  sx={{
                    color: navColor,
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  Packages & Tours
                </Button>
              </Link>

              {userSession?.firstName ? (
                <Button
                  color="inherit"
                  onClick={handleMyAccount}
                  className="btn btn-primary"
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.5rem",
                    border: "1px solid",
                    // borderRadius: "20px",
                    // color: navColor,
                    // borderColor: navColor,
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  {/* <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      color: navColor,
                      transition: "color 0.3s ease-in-out",
                    }}
                  /> */}
                  {userSession?.firstName
                    ? `Welcome, ${userSession?.firstName}`
                    : "Welcome"}{" "}
                </Button>
              ) : (
                <Button
                  color="inherit"
                  onClick={handleSignIn}
                  className="btn btn-primary"
                  sx={{
                    marginTop: "10px",
                    height: "40px",
                    fontSize: "0.65rem",
                    border: "1px solid",
                    // borderRadius: "20px",
                    // color: navColor,
                    // borderColor: navColor,
                    transition:
                      "border-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                >
                  <PersonOutlineIcon
                    sx={{
                      marginRight: "5px",
                      fontSize: "1.2rem",
                      borderColor: navColor,
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
                    color: navColor,
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
              {userSession?.firstName ? (
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
                color={"white"}
                gutterBottom
              >
                Latest blog
              </Typography>

              <Box>
                <Button
                  onClick={navigateToBlogs}
                  sx={{
                    color: "black",
                    background: "white",
                    borderRadius: "25px",
                    p: "10px 20px",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  Discover Blog +
                </Button>
              </Box>
            </Box>
            {errorMsg && (
              <Typography color="red" marginBottom={2}>
                {errorMsg}
              </Typography>
            )}
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <Grid item xs={12} md={6} key={blog._id}>
                  <Box
                    onClick={navigateToBlogs}
                    sx={{
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      "&:hover": {
                        backgroundColor: "#ffffff12",
                        transition: "background-color 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "8px",
                        minWidth: "120px",
                        maxWidth: "150px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
                        alt={blog.title}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          filter: loading ? "blur(8px)" : "none",
                          transition: "filter 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        5 Min read •{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="h6" gutterBottom fontWeight={800}>
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" color="#777777">
                        {blog.subTitle ||
                          blog.content?.slice(0, 100) ||
                          "No preview available"}
                        ...
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </Drawer>
    </Box>
  );
}

export default Navbar;
