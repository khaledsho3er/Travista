import React, { useState, useEffect } from "react";
import SinglePackage from "../components/singlePackage";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const Navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.travistasl.com/api/packages"
        );

        // Get the last two packages from the response
        const specificPackages = response.data.slice(2, 4);
        setPackages(specificPackages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages. Please try again later.");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePackagesClick = () => {
    Navigate("/packages");
  };

  // Format date to display in a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Format currency with symbol
  const formatPrice = (price) => {
    const { amount, currency } = price;

    const currencySymbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      // Add more currencies as needed
    };

    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <Box
        className="explore-section container-padding"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        className="explore-section container-padding"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="explore-section container-padding">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2%",
        }}
      >
        <Typography variant="h4" component="h2" fontWeight="900" gutterBottom>
          Explore our packages
        </Typography>

        {/* <Box display="flex" gap="20px">
          <IconButton sx={{ background: "#ECEEE9" }}>
            <ArrowBackIcon />
          </IconButton>

          <IconButton sx={{ background: "#ECEEE9" }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          gap: "4%",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
            <Card
              className="explore-more-card"
              key={pkg._id}
              sx={{
                backgroundImage: `url(https://api.travistasl.com/${pkg.packagePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "750px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                marginBottom: { xs: "20px", sm: "0" },
                position: "relative",
              }}
            >
              <IconButton
                aria-label="add to favorites"
                sx={{ position: "absolute", top: "15px", right: "15px" }}
              >
                <FavoriteBorderIcon
                  sx={{
                    color: "white",
                    fontSize: "2rem",
                  }}
                />
              </IconButton>

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "flex-end",
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(4px)",
                  borderRadius: "8px",
                  color: "white",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#750046",
                    background: "white",
                    padding: "5px",
                    width: "fit-content",
                    borderRadius: "5px",
                    fontWeight: "700",
                  }}
                >
                  {formatDate(pkg.departureDate)}
                </Typography>
                <Typography variant="h4" fontWeight="900">
                  {pkg.destinations.join(", ")}
                </Typography>
                <Typography
                  className="package-date"
                  variant="body1"
                  color="#A5A5A5"
                  fontSize="2rem"
                >
                  {pkg.totalDays} Days, {pkg.totalNights} Nights
                </Typography>
                <Typography variant="h6" color="#FED7D2">
                  from {formatPrice(pkg.packagePrice)}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <Button
                  className="btn btn-secondary"
                  variant="contained"
                  sx={{ padding: "15px 80px !important" }}
                  onClick={() => handlePackageClick(pkg)}
                >
                  Explore Trip
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", width: "100%", py: 4 }}
          >
            No packages available at the moment.
          </Typography>
        )}
      </Box>
      <Box textAlign="center" mt={4}>
        <Button className="btn btn-secondary" onClick={handlePackagesClick}>
          Explore All Packages
        </Button>
      </Box>
      {/* Render SinglePackage component as a pop-up when a package is clicked */}
      {selectedPackage && (
        <Box className="slide-up-modal show">
          <SinglePackage
            tour={selectedPackage}
            onClose={() => setSelectedPackage(null)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Explore;
