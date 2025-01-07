import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Tab,
  Tabs,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FaCheck } from "react-icons/fa";

function ComponentOne({ setOpen, handleNext, packageDetails }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderTabContent = () => {
    // Extract details from the packageDetails
    const details = packageDetails?.details || {};
    const inclusions = Array.isArray(details?.Inclusions)
      ? details.Inclusions
      : [];
    const exclusions = Array.isArray(details?.Exclusions)
      ? details.Exclusions
      : [];
    const notes = Array.isArray(details?.Notes) ? details.Notes : [];

    switch (activeTab) {
      case 0:
        return (
          <Box mt={2}>
            {inclusions.length > 0 ? (
              inclusions.map((item, index) => (
                <Box display="flex" alignItems="flex-start" mb={2} key={index}>
                  <FaCheck
                    color="#750046"
                    size={16}
                    style={{ marginRight: "8px", marginTop: "4px" }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No inclusions available.</Typography>
            )}
          </Box>
        );
      case 1:
        return (
          <Box mt={2}>
            {exclusions.length > 0 ? (
              exclusions.map((item, index) => (
                <Box display="flex" alignItems="flex-start" mb={2} key={index}>
                  <FaCheck
                    color="#750046"
                    size={16}
                    style={{ marginRight: "8px", marginTop: "4px" }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No inclusions available.</Typography>
            )}
          </Box>
        );
      case 2:
        return (
          <Box mt={2}>
            {notes.length > 0 ? (
              notes.map((item, index) => (
                <Box display="flex" alignItems="flex-start" mb={2} key={index}>
                  <FaCheck
                    color="#750046"
                    size={16}
                    style={{ marginRight: "8px", marginTop: "4px" }}
                  />
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No Notes available.</Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: "40%",
        padding: "32px",
        position: "relative",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16 }}
        aria-label="close"
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <Box display="flex" alignItems="center" gap="8px">
        <div
          variant="contained"
          sx={{
            backgroundColor: "#ffffff",
            color: "#00695c",
            fontSize: "0.8rem",
            borderRadius: "3px",
            textTransform: "uppercase", // Added this to make the text uppercase
            padding: "4px 12px",
            border: "2px",
            borderColor: "#00695c",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            textTransform={"uppercase"}
          >
            {" "}
            {packageDetails.type}
          </Typography>
        </div>
      </Box>

      <Typography variant="h4" fontWeight="bold" mt={2}>
        {packageDetails.name}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mt={1}>
        {packageDetails.duration}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textDecoration: "underline" }}
        mt={1}
        mb={2}
      >
        Read more +
      </Typography>

      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Flights
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails?.details?.flight || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Accommodation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.details.Accommodation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Transportation
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.details.Transportation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Program
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {packageDetails.details.Program}
          </Typography>
        </Grid>
      </Grid>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mt: 3,
          mb: 2,
          "& .MuiTabs-indicator": {
            backgroundColor: "#750046",
          },
          "& .MuiTab-root": {
            color: "#757575",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#750046",
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="Inclusion" />
        <Tab label="Exclusion" />
        <Tab label="General Notes" />
      </Tabs>

      {renderTabContent()}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            padding: "12px",
            borderRadius: "25px",
            fontWeight: "bold",
            textTransform: "none",
            marginTop: "20px",
            backgroundColor: "#0f1c24",
            "&:hover": {
              backgroundColor: "#fff",
              border: "2px solid #0f1c24",
              color: "#0f1c24",
            },
          }}
          onClick={handleNext}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
}

export default ComponentOne;
