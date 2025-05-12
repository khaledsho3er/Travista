import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from "@mui/material";
import AddPackage from "./addPackage";
import EditPackage from "./editPackage"; // Import the EditPackage component
import { getPackages } from "../../services/packageService";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (packageItem) => {
    setSelectedPackage(packageItem);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedPackage(null);
  };

  const fetchPackages = async () => {
    try {
      const data = await getPackages();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handlePackageUpdated = (updatedPackage) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg._id === updatedPackage._id ? { ...pkg, ...updatedPackage } : pkg
      )
    );
    handleCloseEditModal();
  };

  const handlePackageDeleted = (deletedPackageId) => {
    setPackages(packages.filter((pkg) => pkg._id !== deletedPackageId));
    handleCloseEditModal();
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleOpenAddModal}>
          + Add Package
        </Button>
      </Box>

      <Grid container spacing={2}>
        {packages.map((packageItem) => (
          <Grid item xs={12} sm={6} md={4} key={packageItem._id}>
            <Card
              onClick={() => handleOpenEditModal(packageItem)}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, objectFit: "cover", borderRadius: "10px" }}
                image={`https://158.220.96.121/${packageItem.packagePicture}`}
                alt={packageItem.travistaID}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {packageItem.travistaID}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {packageItem.destinations?.join(", ") ||
                    "Unknown Destination"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {packageItem.packagePrice?.amount}{" "}
                  {packageItem.packagePrice?.currency}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddPackage
        open={openAddModal}
        handleClose={handleCloseAddModal}
        onPackageCreated={fetchPackages} // Refresh the list after adding
      />

      {selectedPackage && (
        <EditPackage
          open={openEditModal}
          handleClose={handleCloseEditModal}
          packageData={selectedPackage}
          onPackageUpdated={handlePackageUpdated}
          onPackageDeleted={handlePackageDeleted}
        />
      )}
    </Box>
  );
};

export default DashboardPackages;
