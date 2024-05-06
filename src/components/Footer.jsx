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
          <Link href="/packages">Packages & Tours</Link>
        </ListItem>
        <ListItem>
          <Link href="/visa">Apply for Visa</Link>
        </ListItem>
        <ListItem>
          <Link href="/build-package">Build my package</Link>
        </ListItem>
        <ListItem>
          <Link href="/about">About</Link>
        </ListItem>
        <ListItem>
          <Link href="/offices">Offices</Link>
        </ListItem>
        <ListItem>
          <Link href="/blog">Blog</Link>
        </ListItem>
        <ListItem>
          <Link href="/careers">Careers</Link>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <Typography variant="body1" color="#777777">
            Support
          </Typography>
        </ListItem>
        <ListItem>
          <Link href="/help">Help Center</Link>
        </ListItem>
        <ListItem>
          <Link href="/faq">FAQs</Link>
        </ListItem>
        <ListItem>
          <Link href="/policies">Privacy Policy</Link>
        </ListItem>
        <ListItem>
          <Link href="/terms&conditions">Terms & Conditions</Link>
        </ListItem>
        <ListItem>
          <Link href="/cookiepolicy">Cookie Policy</Link>
        </ListItem>
        <ListItem>
          <Link href="/contact">Contact</Link>
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

        <Typography color="#777777">Website by GabeDesign</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
