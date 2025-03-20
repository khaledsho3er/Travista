import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const DashboardPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/json/dashboardpackage.json"); // Adjust path if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

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
      <Grid container spacing={2}>
        {packages.map((packageItem) => (
          <Grid item xs={12} sm={6} md={4} key={packageItem.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={packageItem.image}
                alt={packageItem.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {packageItem.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {packageItem.destination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${packageItem.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardPackages;
