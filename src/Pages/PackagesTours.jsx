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
          "https://158.220.96.121/api/packages/"
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
          `https://158.220.96.121/api/favorites/my`,
          { params: { userId: userSession._id } }
        );
        const favoriteIds = response.data
          .filter((f) => f.itemType === "package")
          .map((f) => f.itemId);
        setFavoritedPackages(favoriteIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [userSession]);

  const handleFavorite = async (packageId) => {
    if (!userSession?._id) {
      alert("You must be logged in to favorite a package.");
      return;
    }

    try {
      const isFavorited = favoritedPackages.includes(packageId);

      if (isFavorited) {
        await axios.delete("https://158.220.96.121/api/favorites/remove", {
          data: {
            userId: userSession._id,
            itemId: packageId,
          },
        });
        setFavoritedPackages((prev) => prev.filter((id) => id !== packageId));
      } else {
        await axios.post("https://158.220.96.121/api/favorites/", {
          userId: userSession._id,
          itemType: "package",
          itemId: packageId,
        });
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

  return (
    <Box className="packages-page">
      <Helmet>
        <title>Top Tour Packages from Egypt | Travista</title>
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
      <div className="packages-tours-body">
        <Box className="packages-tours">
          <Box sx={{ display: "flex", gap: "10px", padding: "20px 0" }}>
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
                    style={{ borderRadius: "12px" }}
                  >
                    <CardContent
                      sx={{
                        height: "350px",
                        backgroundImage: `url(https://158.220.96.121/${packageDetails.packagePicture})`,
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
                        {new Date(
                          packageDetails.departureDate
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFavorite(packageDetails._id);
                        }}
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          color: favoritedPackages.includes(packageDetails._id)
                            ? "var(--maroon)"
                            : "white",
                          zIndex: 10,
                          "&:hover": {
                            color: "var(--maroon)",
                          },
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
                          {`${packageDetails.destinations[0]} / ${packageDetails.destinations[1]}`}{" "}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="#777777"
                          fontWeight={500}
                        >
                          {`${packageDetails.totalDays} days / ${packageDetails.totalNights} nights`}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="#777777"
                          fontWeight={500}
                        >
                          {`${packageDetails.destinations[0]} / ${packageDetails.destinations[1]}`}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "#266ef1" }}
                        >
                          {packageDetails.packagePrice.amount}{" "}
                          {packageDetails.packagePrice.currency}
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
