import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Navbar from "../components/Navbar";
import Filter from "../components/filter";
import SinglePackage from "../components/singlePackage";

function PackagesTours() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchPackagesData = async () => {
      try {
        const response = await fetch("/json/packages.json"); // Adjust to match your actual file path
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error loading packages:", error);
      }
    };

    fetchPackagesData();
  }, []);

  const handleFilterChange = (filter) => setSelectedFilter(filter);

  const handlePackageClick = (packageId) => {
    const pkg = packages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(pkg); // Open modal with selected package
  };

  const filteredPackages = selectedFilter
    ? packages.filter((pkg) =>
        pkg.type.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    : packages;
  return (
    <Box className="packages-page">
      <Navbar />
      <Box className="hero">
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          className="overlay"
        >
          <Typography variant="h2" color="white" fontWeight={800}>
            Packages & Tours
          </Typography>
          <Typography variant="body1" color="white">
            Experience breathtaking destinations and unforgettable adventures
            with our exclusive travel packages and immersive guided tours
            worldwide.
          </Typography>
        </Box>
      </Box>

      <Box className="packages-tours-body">
        <Box sx={{ display: "flex", gap: "10px", padding: "20px 20px" }}>
          <Filter onFilterChange={handleFilterChange} />
        </Box>
        {filteredPackages.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPackages &&
              filteredPackages.map((pkg) => (
                <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                  <Card onClick={() => handlePackageClick(pkg.id)}>
                    <CardContent
                      sx={{
                        height: "350px",
                        background: `url(${pkg.image})`,
                        color: "white",
                        position: "relative",
                        borderRadius: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        sx={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "white",
                          color: "var(--maroon)",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                        variant="subtitle2"
                      >
                        {pkg.date}
                      </Typography>
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          color: "white",
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <Box
                        sx={{
                          position: "absolute",
                          backgroundImage:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
                          height: "100%",
                          width: "100%",
                          bottom: 0,
                          left: 0,
                          padding: "20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography fontWeight={800} variant="h4" gutterBottom>
                          {pkg.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="#777777"
                          fontWeight={500}
                        >
                          {pkg.duration}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#266ef1" }}
                        >
                          {pkg.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            textAlign="center"
            sx={{ padding: "20px" }}
          >
            No packages found
          </Typography>
        )}
      </Box>

      {/* Slide-Up Modal */}
      {selectedPackage && (
        <Box
          className={`slide-up-modal ${selectedPackage ? "show" : ""}`}
          onClick={() => setSelectedPackage(null)}
        >
          <Box className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SinglePackage
              packageDetails={selectedPackage}
              onClose={() => setSelectedPackage(null)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PackagesTours;
