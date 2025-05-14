import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  IconButton,
  Modal,
  Box,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const BMPApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [viewApp, setViewApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://158.220.96.121/api/build-packages");
      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        setLoading(true);
        await axios.delete(`https://158.220.96.121/api/build-packages/${id}`);
        fetchApplications();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateApplication = async () => {
    try {
      setLoading(true);
      await axios.put(
        `https://158.220.96.121/api/build-packages/${editApp._id}`,
        editApp
      );
      setEditApp(null);
      setIsEditing(false);
      fetchApplications();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original data
    const originalApp = applications.find((app) => app._id === editApp._id);
    setEditApp(originalApp);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: "70%" },
    maxWidth: "800px",
    maxHeight: "90vh",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  // Extract country code and phone number from phoneNumber
  // const extractPhoneDetails = (phoneNumber) => {
  //   if (!phoneNumber) return { countryCode: "", phone: "" };

  //   // Assuming format is like +201020189024
  //   const match = phoneNumber.match(/^(\+\d+)(\d+)$/);
  //   if (match) {
  //     return { countryCode: match[1], phone: match[2] };
  //   }
  //   return { countryCode: "", phone: phoneNumber };
  // };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Build My Package Applications
        </Typography>
      </div>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="BMP applications table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Trip Type</strong>
              </TableCell>
              <TableCell>
                <strong>Departure</strong>
              </TableCell>
              <TableCell>
                <strong>Travel Date</strong>
              </TableCell>
              <TableCell>
                <strong>Budget</strong>
              </TableCell>
              <TableCell>
                <strong>Nights</strong>
              </TableCell>
              <TableCell>
                <strong>Created</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app._id} hover>
                <TableCell>{`${app.firstName} ${app.lastName}`}</TableCell>
                <TableCell>{app.type}</TableCell>
                <TableCell>{`${app.departureCity}, ${app.departureCountry}`}</TableCell>
                <TableCell>{formatDate(app.travelDate)}</TableCell>
                <TableCell>${app.budgetPerPerson}</TableCell>
                <TableCell>{app.numberOfNights}</TableCell>
                <TableCell>{formatDate(app.createdAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => setViewApp(app)}
                      color="primary"
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setEditApp(app);
                        setIsEditing(false);
                      }}
                      color="secondary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => deleteApplication(app._id)}
                      color="error"
                      size="small"
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)}>
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5" component="h2">
              Build My Package Request Details
            </Typography>
            <IconButton onClick={() => setViewApp(null)}>
              <CloseIcon />
            </IconButton>
          </div>

          {viewApp && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "primary.main" }}
                  >
                    Personal Information
                  </Typography>
                  <Typography>
                    <strong>Name:</strong> {viewApp.firstName}{" "}
                    {viewApp.lastName}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {viewApp.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {viewApp.phoneNumber}
                  </Typography>
                  <Typography>
                    <strong>Created:</strong> {formatDate(viewApp.createdAt)}
                  </Typography>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ display: { xs: "none", md: "block" } }}
                />
                <Divider sx={{ display: { xs: "block", md: "none" }, my: 2 }} />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "primary.main" }}
                  >
                    Trip Requirements
                  </Typography>
                  <Typography>
                    <strong>Trip Type:</strong> {viewApp.type}
                  </Typography>
                  <Typography>
                    <strong>Departure:</strong> {viewApp.departureCity},{" "}
                    {viewApp.departureCountry}
                  </Typography>
                  <Typography>
                    <strong>Travel Date:</strong>{" "}
                    {formatDate(viewApp.travelDate)}
                  </Typography>
                  <Typography>
                    <strong>Flexibility:</strong> {viewApp.flexibility} days
                  </Typography>
                  <Typography>
                    <strong>Number of Nights:</strong> {viewApp.numberOfNights}
                  </Typography>
                  <Typography>
                    <strong>Number of Travelers:</strong>{" "}
                    {viewApp.numberOfTravellers}
                  </Typography>
                  <Typography>
                    <strong>Budget per Person:</strong> $
                    {viewApp.budgetPerPerson}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={!!editApp}
        onClose={() => {
          setEditApp(null);
          setIsEditing(false);
        }}
      >
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5" component="h2">
              {isEditing ? "Edit Request" : "Request Details"}
            </Typography>
            <Box>
              {isEditing ? (
                <>
                  <Tooltip title="Save Changes">
                    <IconButton
                      onClick={updateApplication}
                      color="primary"
                      disabled={loading}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton
                      onClick={handleCancelEdit}
                      color="default"
                      disabled={loading}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Edit">
                  <IconButton onClick={handleEditToggle} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Close">
                <IconButton
                  onClick={() => {
                    setEditApp(null);
                    setIsEditing(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </div>

          {editApp && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" sx={{ color: "primary.main" }}>
                Personal Information
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <TextField
                      label="First Name"
                      fullWidth
                      value={editApp.firstName || ""}
                      onChange={(e) =>
                        setEditApp({ ...editApp, firstName: e.target.value })
                      }
                    />
                    <TextField
                      label="Last Name"
                      fullWidth
                      value={editApp.lastName || ""}
                      onChange={(e) =>
                        setEditApp({ ...editApp, lastName: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {editApp.firstName}{" "}
                    {editApp.lastName}
                  </Typography>
                )}
              </Box>

              {isEditing ? (
                <TextField
                  label="Email"
                  fullWidth
                  value={editApp.email || ""}
                  onChange={(e) =>
                    setEditApp({ ...editApp, email: e.target.value })
                  }
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {editApp.email}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  label="Phone Number"
                  fullWidth
                  value={editApp.phoneNumber || ""}
                  onChange={(e) =>
                    setEditApp({ ...editApp, phoneNumber: e.target.value })
                  }
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {editApp.phoneNumber}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ color: "primary.main" }}>
                Trip Requirements
              </Typography>

              {isEditing ? (
                <TextField
                  select
                  label="Trip Type"
                  fullWidth
                  value={editApp.type || ""}
                  onChange={(e) =>
                    setEditApp({ ...editApp, type: e.target.value })
                  }
                >
                  {[
                    "Personal Trip",
                    "Business Trip",
                    "Family Trip",
                    "Honeymoon",
                    "Group Trip",
                  ].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Trip Type:</strong> {editApp.type}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <TextField
                      label="Departure Country"
                      fullWidth
                      value={editApp.departureCountry || ""}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          departureCountry: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Departure City"
                      fullWidth
                      value={editApp.departureCity || ""}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          departureCity: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Departure:</strong> {editApp.departureCity},{" "}
                    {editApp.departureCountry}
                  </Typography>
                )}
              </Box>

              {isEditing ? (
                <TextField
                  label="Travel Date"
                  type="date"
                  fullWidth
                  value={
                    editApp.travelDate
                      ? new Date(editApp.travelDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setEditApp({ ...editApp, travelDate: e.target.value })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Travel Date:</strong> {formatDate(editApp.travelDate)}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <TextField
                      label="Flexibility (days)"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      fullWidth
                      value={editApp.flexibility || 0}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          flexibility: parseInt(e.target.value),
                        })
                      }
                    />
                    <TextField
                      label="Number of Nights"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      fullWidth
                      value={editApp.numberOfNights || 1}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          numberOfNights: parseInt(e.target.value),
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mb: 1, mr: 3 }}>
                      <strong>Flexibility:</strong> {editApp.flexibility} days
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Number of Nights:</strong>{" "}
                      {editApp.numberOfNights}
                    </Typography>
                  </>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <TextField
                      label="Number of Travelers"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      fullWidth
                      value={editApp.numberOfTravellers || 1}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          numberOfTravellers: parseInt(e.target.value),
                        })
                      }
                    />
                    <TextField
                      label="Budget per Person ($)"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      fullWidth
                      value={editApp.budgetPerPerson || 0}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          budgetPerPerson: parseInt(e.target.value),
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mb: 1, mr: 3 }}>
                      <strong>Number of Travelers:</strong>{" "}
                      {editApp.numberOfTravellers}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Budget per Person:</strong> $
                      {editApp.budgetPerPerson}
                    </Typography>
                  </>
                )}
              </Box>

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Created:</strong> {formatDate(editApp.createdAt)}
              </Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BMPApplicationManager;
