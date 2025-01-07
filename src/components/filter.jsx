import React from "react";
import { Box, Typography } from "@mui/material";
import NatureIcon from "@mui/icons-material/Park";
import HistoryIcon from "@mui/icons-material/AccountBalance";
import AdventureIcon from "@mui/icons-material/Map";
import CityIcon from "@mui/icons-material/LocationCity";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WinterIcon from "@mui/icons-material/AcUnit";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import MosqueIcon from "@mui/icons-material/Mosque";
const Filter = ({ onFilterChange }) => {
  const filters = [
    { label: "NATURE", icon: <NatureIcon /> },
    { label: "HISTORY", icon: <HistoryIcon /> },
    { label: "ADVENTURE", icon: <AdventureIcon /> },
    { label: "CITY", icon: <CityIcon /> },
    { label: "SPORTS", icon: <SportsBasketballIcon /> },
    { label: "ROMANTIC", icon: <FavoriteIcon /> },
    { label: "FAMILY", icon: <Diversity2Icon /> },
    { label: "SUMMER", icon: <BeachAccessIcon /> },
    { label: "WINTER", icon: <WinterIcon /> },
    { label: "HONEYMOON", icon: <LoyaltyIcon /> },
    { label: "SHOPPING", icon: <ShoppingBasketIcon /> },
    { label: "HAJJ", icon: <MosqueIcon /> },
    { label: "UMRAH", icon: <MosqueIcon /> },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px 0",
      }}
    >
      <Box
        sx={{ maxWidth: "1200px", margin: "0 auto", textAlign: "left", mb: 5 }}
      >
        <Box sx={{ textAlign: "left", mb: 5 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            You can filter travel ideas by theme
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
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
                minWidth: "80px",
                color: "black",
                transition: "color 0.3s",
                cursor: "pointer",
                "&:hover": {
                  color: "var(--maroon)",
                },
              }}
              onClick={() => onFilterChange(filter.label)} // Call the callback
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
