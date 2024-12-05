import React from "react";
import { Box, Typography } from "@mui/material";
import NatureIcon from "@mui/icons-material/Park";
import HistoryIcon from "@mui/icons-material/AccountBalance";
import AdventureIcon from "@mui/icons-material/Map";
import CityIcon from "@mui/icons-material/LocationCity";
import WorldIcon from "@mui/icons-material/Public";
import MexicoIcon from "@mui/icons-material/Restaurant";
import SouthAfricaIcon from "@mui/icons-material/TravelExplore";
import WinterIcon from "@mui/icons-material/AcUnit";

const Filter = () => {
  const filters = [
    { label: "NATURE", icon: <NatureIcon /> },
    { label: "HISTORY", icon: <HistoryIcon /> },
    { label: "ADVENTURE", icon: <AdventureIcon /> },
    { label: "CITY", icon: <CityIcon /> },
    { label: "AROUND THE WORLD", icon: <WorldIcon /> },
    { label: "CITIES", icon: <CityIcon /> },
    { label: "MÉXICO", icon: <MexicoIcon /> },
    { label: "SOUTH AFRICA", icon: <SouthAfricaIcon /> },
    { label: "WINTER", icon: <WinterIcon /> },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px 0",
      }}
    >
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "left" , mb:5 }}>
        {/* Centered Title */}
        <Box sx={{ textAlign: "left" , mb:5}}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          You can filter travel ideas by theme
        </Typography>
        </Box>
        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Evenly space items across the width
            flexWrap: "wrap",
            gap: "20px", // Add spacing between rows on smaller screens
          }}
        >
          {filters.map((filter, index) => (
            <Box
              key={index}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 1 calc(11% - 20px)", // Flex to adjust width dynamically
                minWidth: "80px", // Ensure icons don't shrink too much
                color: "black",
                transition: "color 0.3s",
                cursor: "pointer",
                "&:hover": {
                  color: "var(--maroon)", // Change color on hover
                },
              }}
            >
              <Box sx={{ fontSize: "2rem" }}>{filter.icon}</Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ marginTop: "5px" }}
              >
                {filter.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
