import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SinglePackage from "../components/singlePackage";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import Filter from "../components/filter";
import axios from "axios"; // Make sure to install axios using npm or yarn
import { useUser } from "../utils/userContext"; // Adjust path if needed
import { Helmet } from "react-helmet"; // Import Helmet for SEO management
function PackagesTours() {
  const [selectedFilter, setSelectedFilter] = useState(""); // Manage selected filter state
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]); // State to store fetched packages
  const [favoritedPackages, setFavoritedPackages] = useState([]);

  const { userSession } = useUser(); // Get the logged-in user's session

  // Fetch packages when component mounts
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "https://api.travistasl.com/api/packages/"
        );
        setPackages(response.data); // Assuming response.data is the array of packages
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };

    fetchPackages();
  }, []); // Empty dependency array to fetch only once when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userSession?._id) return;

      try {
        const response = await axios.get(
          `https://api.travistasl.com/api/favorites/my`,
          {
            headers: {
              Authorization: `Bearer ${userSession.token}`,
            },
          }
        );

        const favoriteIds = response.data
          .filter((f) => f.itemType === "package")
          .map((f) => f.item?._id); // ✅ instead of f.itemId

        setFavoritedPackages(favoriteIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userSession]);

  const handleFavorite = async (packageId) => {
    if (!userSession?.token) {
      alert("You must be logged in to favorite a package.");
      return;
    }

    try {
      const isFavorited = favoritedPackages.includes(packageId);

      if (isFavorited) {
        await axios.delete("https://api.travistasl.com/api/favorites/remove", {
          data: {
            itemId: packageId,
            itemType: "package",
          },
          headers: {
            Authorization: `Bearer ${userSession.token}`,
          },
        });
        setFavoritedPackages((prev) => prev.filter((id) => id !== packageId));
      } else {
        await axios.post(
          "https://api.travistasl.com/api/favorites/",
          {
            itemId: packageId,
            itemType: "package",
          },
          {
            headers: {
              Authorization: `Bearer ${userSession.token}`,
            },
          }
        );
        setFavoritedPackages((prev) => [...prev, packageId]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handlePackageClick = (packageDetails) =>
    setSelectedPackage(packageDetails);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Update selected filter
  };

  // Filter packages based on packageType (case-insensitive)
  const filteredPackages = selectedFilter
    ? packages.filter(
        (packageDetails) =>
          packageDetails.packageType?.toLowerCase() ===
          selectedFilter.toLowerCase()
      )
    : packages;

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

  return (
    <Box className="packages-page">
      <Helmet>
        <title>Top Tour Packages | Travista</title>
        <meta
          name="description"
          content="Discover top-rated travel packages from Egypt to global destinations. Book senior trips, guided tours, and more with Travista."
        />
        <meta
          name="keywords"
          content="Egypt tour packages, travel deals, senior trips, Travista tours"
        />
        <meta
          property="og:title"
          content="Top Tour Packages from Egypt | Travista"
        />
        <meta
          property="og:description"
          content="Book unforgettable tours from Egypt to top global destinations with Travista."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://travista.vercel.app/packages"
        />
        <link rel="canonical" href="https://travista.vercel.app/packages" />
      </Helmet>
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
          <Typography
            variant="h3"
            color="white"
            fontWeight={800}
            textAlign="center"
            fontSize={{ xs: "1.5rem", sm: "2rem", md: "3rem", lg: "3.5rem" }}
          >
            Travel Beyond the Ordinary
          </Typography>
          <Typography variant="body1" color="white">
            From stunning landscapes to rich cultures, experience the world like
            never before with our unforgettable adventures
          </Typography>
        </Box>
      </Box>
      <div className="packages-tours-body">
        <Box className="packages-tours">
          <Box sx={{ display: "flex", padding: "20px 0" }}>
            <Filter
              onFilterChange={handleFilterChange}
              selectedFilter={selectedFilter}
            />
          </Box>
          {filteredPackages.length > 0 ? (
            <Grid container spacing={3}>
              {filteredPackages.map((packageDetails, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    onClick={() => handlePackageClick(packageDetails)}
                    sx={{
                      backgroundImage: `url(https://api.travistasl.com/${packageDetails.packagePicture})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: { xs: "370px", sm: "400px", md: "450px" },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      position: "relative",
                      borderRadius: "20px",
                      padding: "25px",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    {/* Overlay for image opacity */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.35)",
                        borderRadius: "20px",
                        zIndex: 1,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Favorite button */}
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(packageDetails._id);
                      }}
                      sx={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        color: favoritedPackages.includes(packageDetails._id)
                          ? "var(--maroon)"
                          : "white",
                        zIndex: 10,
                        "&:hover": {
                          color: "var(--maroon)",
                          transform: "scale(1.1)",
                        },
                        background: "rgba(0,0,0,0.3)",
                        borderRadius: "50%",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>

                    {/* Main content */}
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        justifyContent: "flex-end",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "12px",
                        color: "white",
                        position: "relative",
                        zIndex: 2,
                        alignItems: "flex-start",
                        p: 3,
                        m: 0,
                      }}
                    >
                      {/* Date badge */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#750046",
                          background: "white",
                          padding: "4px 10px",
                          width: "fit-content",
                          borderRadius: "6px",
                          fontWeight: "700",
                          fontSize: "0.9rem",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                      >
                        {formatDate(packageDetails.departureDate)}
                      </Typography>

                      {/* Package name */}
                      <Typography
                        variant="h5"
                        fontWeight="900"
                        sx={{
                          fontSize: {
                            xs: "1.2rem",
                            sm: "1.4rem",
                            md: "1.6rem",
                          },
                          lineHeight: 1.2,
                          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                        }}
                      >
                        {packageDetails.packageName}
                      </Typography>

                      {/* Destinations */}
                      <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        sx={{
                          color: "#f1bfdd",
                          fontSize: { xs: "0.95rem", sm: "1.1rem" },
                          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                        }}
                      >
                        {packageDetails.destinations.join(" / ")}
                      </Typography>

                      {/* Duration */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#fff",
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                          fontWeight: "500",
                        }}
                      >
                        {packageDetails.totalDays} Days,{" "}
                        {packageDetails.totalNights} Nights
                      </Typography>

                      {/* Price Highlight */}
                      <Box
                        sx={{
                          background: "var(--maroon)",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: { xs: "1.1rem", sm: "1.3rem" },
                          borderRadius: "8px",
                          px: 2,
                          py: 1,
                          boxShadow: "0 4px 12px rgba(117,0,70,0.3)",
                          mt: 1,
                          alignSelf: "flex-start",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 6px 16px rgba(117,0,70,0.4)",
                          },
                        }}
                      >
                        From {formatPrice(packageDetails.packagePrice)}
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
      </div>
      {selectedPackage && (
        <Box
          className={`slide-up-modal ${selectedPackage ? "show" : ""}`}
          onClick={() => setSelectedPackage(null)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <SinglePackage
              tour={selectedPackage}
              onClose={() => setSelectedPackage(null)}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PackagesTours;
