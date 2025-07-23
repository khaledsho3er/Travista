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
        <Typography
          variant="h4"
          fontWeight="900"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2.5rem" } }}
        >
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
          justifyContent: { xs: "center", sm: "space-between" },
          flexWrap: "wrap",
          gap: 4,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          "@media (max-height:580px)": {
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "stretch",
            gap: 2,
          },
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
                width: { xs: "100%", sm: "500px", md: "550px" },
                height: { xs: "500px", sm: "600px", md: "750px" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                borderRadius: "20px",
                padding: "30px",
                marginTop: { xs: 0, sm: index % 2 === 0 ? 0 : "50px" },
                transition: "all 0.4s",
                "&:hover": {
                  width: { sm: "600px", md: "650px" },
                },
                "@media (max-height:580px)": {
                  width: "320px",
                  height: "420px",
                  padding: "16px",
                  marginTop: 0,
                },
              }}
            >
              {/* Overlay for image opacity */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.35)", // adjust opacity as needed
                  borderRadius: "20px",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <IconButton
                aria-label="add to favorites"
                sx={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  zIndex: 2,
                }}
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
                  position: "relative",
                  zIndex: 2,
                  alignItems: "flex-start",
                  "@media (max-height:580px)": {
                    gap: "6px",
                    "& .MuiTypography-h4": { fontSize: "1.1rem" },
                    "& .MuiTypography-body1": { fontSize: "0.9rem" },
                    "& .MuiTypography-h6": { fontSize: "1rem" },
                    "& .MuiTypography-body2": { fontSize: "0.8rem" },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "#750046",
                    background: "white",
                    padding: { xs: "3px 8px", sm: "5px" },
                    width: "fit-content",
                    borderRadius: "5px",
                    fontWeight: "700",
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                  }}
                >
                  {formatDate(pkg.departureDate)}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="900"
                  sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem", md: "2rem" } }}
                >
                  {pkg.destinations.join(", ")}
                </Typography>

                <Typography
                  className="package-date"
                  variant="body1"
                  color="#fff"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.2rem", md: "1.5rem" },
                  }}
                >
                  {pkg.totalDays} Days, {pkg.totalNights} Nights
                </Typography>

                {/* Price Highlight at the bottom */}
                <Box
                  sx={{
                    background: "var(--maroon)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: { xs: "1.3rem", sm: "1.6rem" },
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                    boxShadow: "0 2px 8px rgba(117,0,70,0.15)",
                    mt: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  From {formatPrice(pkg.packagePrice)}
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <Button
                  className="btn btn-secondary"
                  variant="contained"
                  sx={{
                    padding: {
                      xs: "10px 50px",
                      sm: "15px 60px",
                      md: "15px 80px",
                    },
                    width: { xs: "100%", sm: "auto" },
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    zIndex: 2,
                    position: "relative",
                  }}
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
        <motion.div
          whileHover={{
            scale: 1.08,
            boxShadow: "0 8px 32px rgba(117,0,70,0.18)",
            borderRadius: "50px",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{ display: "inline-block" }}
        >
          <Button
            className="btn btn-primary"
            sx={{
              border: "1px solid var(--maroon)",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              padding: { xs: "10px 24px", sm: "12px 40px" },
            }}
            onClick={handlePackagesClick}
          >
            Explore All Packages
          </Button>
        </motion.div>
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
