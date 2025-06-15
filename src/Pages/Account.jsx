import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PackageCards from "../components/Cards";
import EditProfile from "../components/editProfile";
import { Typography } from "@mui/material";
import { Box, Grid, Button } from "@mui/material";
import { useUser } from "../utils/userContext";
import axios from "axios";
import SavedItemCard from "../components/SavedItemCard";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [favorites, setFavorites] = useState([]);
  const [activeSavedTab, setActiveSavedTab] = useState("package");

  const { userSession, setUserSession } = useUser();
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

        setFavorites(response.data); // Make sure your backend returns populated itemDetails
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, [userSession]);

  const savedPackages = favorites.filter((item) => item.itemType === "package");
  const savedArticles = favorites.filter((item) => item.itemType === "blog");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return <div className="content">Bookings content goes here.</div>;
      case "customPackages":
        return (
          <div className="content">Custom Packages content goes here.</div>
        );
      case "saved":
        return (
          <Box className="saved-section-content">
            <Box
              sx={{ display: "flex", gap: "10px", padding: "20px 10px 20px" }}
            >
              <Button
                onClick={() => setActiveSavedTab("package")}
                className="btn btn-inverse btn-secondary"
                sx={{
                  fontSize: "10px",
                  color:
                    activeSavedTab === "package"
                      ? "white !important"
                      : "black !important",
                  backgroundColor:
                    activeSavedTab === "package" ? "var(--maroon)" : "inherit",
                  "&:hover": {
                    color: "white !important",
                  },
                }}
              >
                Packages
              </Button>
              <Button
                onClick={() => setActiveSavedTab("blog")}
                className="btn btn-inverse btn-secondary"
                sx={{
                  fontSize: "10px",
                  color:
                    activeSavedTab === "blog"
                      ? "white !important"
                      : "black !important",
                  backgroundColor:
                    activeSavedTab === "blog" ? "var(--maroon)" : "inherit",
                  "&:hover": {
                    color: "white !important",
                  },
                }}
              >
                Articles
              </Button>
            </Box>
            <Grid container spacing={2}>
              {(activeSavedTab === "package" ? savedPackages : savedArticles)
                .length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ marginLeft: 2, marginTop: 2 }}
                >
                  You have no saved{" "}
                  {activeSavedTab === "package" ? "packages" : "articles"}.
                </Typography>
              ) : (
                (activeSavedTab === "package"
                  ? savedPackages
                  : savedArticles
                ).map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <SavedItemCard item={item.item} type={item.itemType} />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        );
      case "editProfile":
        return (
          <EditProfile userData={userSession} setUserData={setUserSession} />
        );
      default:
        return null;
    }
  };
  if (!userSession) return <Typography>Loading...</Typography>;

  return (
    <>
      <Navbar />

      <div className="account-page">
        <header className="account-header">
          <h1>Hey, {userSession.firstName}</h1>
          <p>
            You can manage all your bookings, saved articles, and profile
            information here.
          </p>
          <div className="account-tabs">
            <button
              onClick={() => setActiveTab("bookings")}
              className={activeTab === "bookings" ? "active" : ""}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("customPackages")}
              className={activeTab === "customPackages" ? "active" : ""}
            >
              Custom Packages
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={activeTab === "saved" ? "active" : ""}
            >
              Saved
            </button>
            <button
              onClick={() => setActiveTab("editProfile")}
              className={activeTab === "editProfile" ? "active" : ""}
            >
              Edit Profile
            </button>
          </div>
        </header>

        <section className="account-content">{renderContent()}</section>

        <Footer />
      </div>
    </>
  );
};

export default AccountPage;
