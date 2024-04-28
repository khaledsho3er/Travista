import React, { useState } from "react";
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

import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CloseIcon from "@mui/icons-material/Close";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const sideList = () => (
    <Box
      sx={{
        width: "auto",
        height: "30vh",
        background: "#142328",
        padding: "20px 35px",
        marginTop: "40px",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Grid container spacing={20}>
        <Grid item xs={6}>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Packages & Tours <ArrowOutwardIcon fontSize="2rem" />
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Apply for Visa <ArrowOutwardIcon fontSize="2rem" />
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Build my Package <ArrowOutwardIcon fontSize="2rem" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Our Story <ArrowOutwardIcon fontSize="2rem" />
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Our Offices <ArrowOutwardIcon fontSize="2rem" />
          </Button>
          <Button
            color="inherit"
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="nav-link"
          >
            Careers <ArrowOutwardIcon fontSize="2rem" />
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
      <Box sx={{ padding: "20px 35px", color: "white" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <Typography
            variant="h5"
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
              }}
            >
              Discover Blog +
            </Button>
          </Box>
        </Box>

        <Grid container justifyContent={"space-between"} gap={"1px"}>
          <Grid item xs={6} md={5.5}>
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

          <Grid item xs={6} md={5.5}>
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
    <Box>
      <AppBar
        position="static"
        sx={{ padding: "10px 5%", background: "none", boxShadow: "none" }}
        className="navbar"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ maxWidth: "205px" }}>
            <img
              src="assets/main-logo.png"
              alt="Logo"
              style={{ width: "100%" }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button color="inherit" sx={{ color: "black" }}>
              Packages & Tours
            </Button>
            <Button color="inherit" className="btn btn-secondary btn-inverse">
              <PersonOutlineIcon sx={{ marginRight: "5px" }} />
              Sign In
            </Button>

            <IconButton
              edge="start"
              style={{ margin: " 0 16px" }} // approximates theme.spacing(2)
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: "black", fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: "auto",
            height: "90vh",
            background: "#142328",
            padding: "0 4%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 35px",
            }}
          >
            <Box sx={{ maxWidth: "205px" }}>
              <img
                src="assets/logo-white.png"
                alt="Logo"
                style={{ width: "100%" }}
              />
            </Box>

            <Box>
              <Button color="inherit" className="btn btn-secondary">
                <PersonOutlineIcon
                  sx={{ marginRight: "5px", color: "white" }}
                />
                Sign In
              </Button>

              <IconButton
                edge="start"
                style={{ margin: " 0 16px" }} // approximates theme.spacing(2)
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
