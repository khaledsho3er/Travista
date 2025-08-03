import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";

const OdooPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdooPackages = async () => {
      try {
        const response = await axios.post(
          "https://travistaeg.com/api/list_crm_pacakge", // keep the typo
          {}, // POST body must be defined, even if empty
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: false, // needed only if backend sends cookies
          }
        );

        const result = response.data?.result?.data || [];
        setPackages(result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Odoo packages:", err);
        setError("Failed to fetch packages from Odoo");
        setLoading(false);
      }
    };

    fetchOdooPackages();
  }, []);

  const extractHref = (htmlString) => {
    const match = htmlString?.match(/href="([^"]+)"/);
    return match ? match[1] : null;
  };
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Odoo Packages
      </Typography>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Destination(s)</TableCell>
                  <TableCell>Travel Dates</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.map((pkg) => {
                  const pdfUrl = extractHref(pkg.package_attachment_url);
                  return (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.id}</TableCell>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.crm_package_type || "N/A"}</TableCell>
                      <TableCell>
                        {pkg.destination_list?.map((d) => d.name).join(", ") ||
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        {pkg.travel_date} → {pkg.return_date}
                      </TableCell>
                      <TableCell>
                        {pdfUrl ? (
                          <Link href={pdfUrl} target="_blank" rel="noopener">
                            View PDF
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        {pkg.description ? (
                          <Link
                            href={pkg.description}
                            target="_blank"
                            rel="noopener"
                          >
                            Link
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OdooPackages;
