import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PackageCards from "../components/Cards";

import { Box, Grid, Button } from "@mui/material";
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("saved");

  const tours = [
    {
      image: "/assets/packages-page/tours/1.png",
      date: "March 2024",
      name: "Disney Land Paris",
      duration: "A magical dream tour",
      price: "€125",
    },
    {
      image: "/assets/packages-page/tours/1.png",
      date: "April 2024",
      name: "Andorra Skiing Trip",
      duration: "Breathtaking slopes and stunning vistas",
      price: "€110",
    },
  ];

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
                className="btn btn-secondary btn-inverse"
                sx={{ fontSize: "10px ", color: "black !important" }}
              >
                Packages
              </Button>
              <Button
                className="btn btn-secondary btn-inverse"
                sx={{ fontSize: "10px", color: "black !important" }}
              >
                Tours
              </Button>
              <Button
                className="btn btn-secondary btn-inverse"
                sx={{ fontSize: "10px", color: "black !important" }}
              >
                Articles
              </Button>
            </Box>
            <Grid container spacing={1}>
              {tours.map((tour, index) => (
                <Grid item xs={12} sm={6} md={3.1} gap={2} key={index}>
                  <PackageCards tour={tour} />
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case "editProfile":
        return <div className="content">Edit Profile content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="account-page">
        <header className="account-header">
          <h1>Hey, Mohamed</h1>
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
