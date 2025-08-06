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
import { motion } from "framer-motion";
const Filter = ({ onFilterChange, selectedFilter }) => {
  const filters = [
    { label: "NATURE", value: "nature", icon: <NatureIcon /> },
    { label: "HISTORY", value: "history", icon: <HistoryIcon /> },
    { label: "ADVENTURE", value: "adventure", icon: <AdventureIcon /> },
    { label: "CITY", value: "city", icon: <CityIcon /> },
    { label: "SPORTS", value: "sports", icon: <SportsBasketballIcon /> },
    { label: "ROMANTIC", value: "romantic", icon: <FavoriteIcon /> },
    { label: "FAMILY", value: "family", icon: <Diversity2Icon /> },
    { label: "SUMMER", value: "summer", icon: <BeachAccessIcon /> },
    { label: "WINTER", value: "winter", icon: <WinterIcon /> },
    { label: "HONEYMOON", value: "honeymoon", icon: <LoyaltyIcon /> },
    { label: "SHOPPING", value: "shopping", icon: <ShoppingBasketIcon /> },
    { label: "HAJJ & UMRAH", value: "hajj&umrah", icon: <MosqueIcon /> },
  ];

  const handleFilterClick = (filterValue) => {
    // If the clicked filter is already selected, deselect it (pass empty string)
    if (selectedFilter === filterValue) {
      onFilterChange("");
    } else {
      // Otherwise, select the new filter
      onFilterChange(filterValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
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
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)", // Mobile: 3 per row
              sm: "repeat(4, 1fr)", // Small tablets: 4 per row
              md: "repeat(6, 1fr)", // Medium devices: 6 per row
              lg: "repeat(12, 1fr)", // Large devices: 8 per row
            },
            gap: "20px",
            justifyItems: "center",
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
                width: "100%",
                color:
                  selectedFilter === filter.value ? "var(--maroon)" : "black",
                transition: "color 0.3s",
                cursor: "pointer",
                "&:hover": {
                  color: "var(--maroon)",
                },
              }}
              onClick={() => handleFilterClick(filter.value)}
            >
              <motion.div
                whileHover={{
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 180, damping: 18 },
                }}
                style={{
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {filter.icon}
              </motion.div>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ marginTop: "5px", fontSize: { xs: "12px", sm: "14px" } }}
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
