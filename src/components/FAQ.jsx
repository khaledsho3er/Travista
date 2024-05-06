import React from "react";
import { Typography, Box, Button, List, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function FAQ() {
  return (
    <Box className="faq-section">
      <Box className="faq-title">
        <Typography variant="h3" fontWeight={700}>
          Frequently Asked <br /> Questions
        </Typography>

        <Typography variant="body1">
          Have any other questions in mind?
        </Typography>

        <Button className="btn btn-primary btn-black">Contact Us</Button>
      </Box>

      <Box className="faq-list">
        <List>
          <ListItem>
            <Typography variant="h5">
              Are there any extra fees for custom packages?
            </Typography>

            <AddIcon />
          </ListItem>

          <hr />

          <ListItem>
            <Typography variant="h5">
              Can I build a package for my high school senior trip?
            </Typography>

            <AddIcon />
          </ListItem>

          <hr />

          <ListItem>
            <Typography variant="h5">
              Will I get a travel guide with my package?
            </Typography>

            <AddIcon />
          </ListItem>

          <hr />

          <ListItem>
            <Typography variant="h5">Can I cancel my package?</Typography>

            <AddIcon />
          </ListItem>

          <hr />

          <ListItem>
            <Typography variant="h5">
              What is the fee of postponing my package?
            </Typography>

            <AddIcon />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default FAQ;
