import React from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
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
          sx={{
            width: "100%",
          }}
        />
        <Button className="btn btn-primary btn-black">Subscribe</Button>
        <Box>
          <FacebookIcon />
          <InstagramIcon />
          <XIcon />
          <LinkedInIcon />
          <YouTubeIcon />
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
          <Link to="/offices">Offices</Link>
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
          © 2023 Travista. All rights reserved.
        </Typography>
        <Link to="https://www.youngproductionss.com/" style={{ textDecoration: "none" }}>
        <Typography color="#777777">
          © Powered By Young Productions.
        </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
