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
  Chip,
  Tooltip,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ApplicationManager = () => {
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
      const res = await axios.get("https://158.220.96.121/api/applications");
      setApplications(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        setLoading(true);
        await axios.delete(`https://158.220.96.121/api/applications/${id}`);
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
        `https://158.220.96.121/api/applications/${editApp._id}`,
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

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
        return "success";
      case "rejected":
        return "error";
      case "completed":
        return "info";
      default:
        return "default";
    }
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
          Applications Management
        </Typography>
      </div>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="applications table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Package</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Room Type</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
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
                <TableCell>{app.packageId?.packageName || "N/A"}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{`${app.countryCode}${app.phone}`}</TableCell>
                <TableCell>{app.roomType}</TableCell>
                <TableCell>
                  <Chip
                    label={app.status}
                    color={getStatusColor(app.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(app.createdAt)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={() => setViewApp(app)}
                      color="#ccc"
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
                      color="#ccc"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => deleteApplication(app._id)}
                      color="#ccc"
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
              Application Details
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
                    <strong>Phone:</strong> {viewApp.countryCode}
                    {viewApp.phone}
                  </Typography>
                  <Typography>
                    <strong>Adults:</strong> {viewApp.adults}
                  </Typography>
                  <Typography>
                    <strong>Children:</strong> {viewApp.children}
                  </Typography>
                  <Typography>
                    <strong>Room Type:</strong> {viewApp.roomType}
                  </Typography>
                  <Typography>
                    <strong>Notes:</strong>{" "}
                    {viewApp.notes || "No notes provided"}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong>
                    <Chip
                      label={viewApp.status}
                      color={getStatusColor(viewApp.status)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
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
                    Package Information
                  </Typography>
                  {viewApp.packageId ? (
                    <>
                      <Typography>
                        <strong>Package Name:</strong>{" "}
                        {viewApp.packageId.packageName}
                      </Typography>
                      <Typography>
                        <strong>Package ID:</strong>{" "}
                        {viewApp.packageId.travistaID}
                      </Typography>
                      <Typography>
                        <strong>Type:</strong> {viewApp.packageId.packageType}
                      </Typography>
                      <Typography>
                        <strong>Price:</strong>{" "}
                        {viewApp.packageId.packagePrice.amount}{" "}
                        {viewApp.packageId.packagePrice.currency}
                      </Typography>
                      <Typography>
                        <strong>Departure Date:</strong>{" "}
                        {formatDate(viewApp.packageId.departureDate)}
                      </Typography>
                      <Typography>
                        <strong>Destinations:</strong>{" "}
                        {viewApp.packageId.destinations.join(", ")}
                      </Typography>
                      <Typography>
                        <strong>Duration:</strong> {viewApp.packageId.totalDays}{" "}
                        days, {viewApp.packageId.totalNights} nights
                      </Typography>
                    </>
                  ) : (
                    <Typography color="text.secondary">
                      No package information available
                    </Typography>
                  )}
                </Box>
              </Box>

              {viewApp.packageId && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: "primary.main" }}
                  >
                    Additional Package Details
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1">
                      <strong>Hotels:</strong>
                    </Typography>
                    {viewApp.packageId.hotels.map((hotel, index) => (
                      <Box key={index} sx={{ ml: 2, mb: 1 }}>
                        <Typography>
                          {hotel.hotelName} - {hotel.city} ({hotel.nights}{" "}
                          nights)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Single: {hotel.single}, Double: {hotel.double},
                          Triple: {hotel.triple}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1">
                      <strong>Flights:</strong>
                    </Typography>
                    {viewApp.packageId.flights.map((flight, index) => (
                      <Box key={index} sx={{ ml: 2, mb: 1 }}>
                        <Typography>
                          {flight.airline}: {flight.from} to {flight.to}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(flight.departureDate)} (
                          {flight.departureTime} - {flight.arrivalTime})
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 3,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">
                        <strong>Includes:</strong>
                      </Typography>
                      <ul>
                        {viewApp.packageId.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">
                        <strong>Excludes:</strong>
                      </Typography>
                      <ul>
                        {viewApp.packageId.excludes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1">
                      <strong>General Notes:</strong>
                    </Typography>
                    <ul>
                      {viewApp.packageId.generalNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </Box>
                </>
              )}
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
              {isEditing ? "Edit Application" : "Application Details"}
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
                      label="Country Code"
                      value={editApp.countryCode || ""}
                      onChange={(e) =>
                        setEditApp({ ...editApp, countryCode: e.target.value })
                      }
                      sx={{ width: { xs: "100%", sm: "30%" } }}
                    />
                    <TextField
                      label="Phone"
                      fullWidth
                      value={editApp.phone || ""}
                      onChange={(e) =>
                        setEditApp({ ...editApp, phone: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Phone:</strong> {editApp.countryCode}
                    {editApp.phone}
                  </Typography>
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
                      label="Adults"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      value={editApp.adults || 1}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          adults: parseInt(e.target.value),
                        })
                      }
                      sx={{ width: { xs: "100%", sm: "50%" } }}
                    />
                    <TextField
                      label="Children"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={editApp.children || 0}
                      onChange={(e) =>
                        setEditApp({
                          ...editApp,
                          children: parseInt(e.target.value),
                        })
                      }
                      sx={{ width: { xs: "100%", sm: "50%" } }}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body1" sx={{ mb: 1, mr: 3 }}>
                      <strong>Adults:</strong> {editApp.adults}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Children:</strong> {editApp.children}
                    </Typography>
                  </>
                )}
              </Box>

              {isEditing ? (
                <TextField
                  select
                  label="Room Type"
                  fullWidth
                  value={editApp.roomType || ""}
                  onChange={(e) =>
                    setEditApp({ ...editApp, roomType: e.target.value })
                  }
                >
                  {[
                    "Single Room",
                    "Double Room",
                    "Triple Room",
                    "Family Room",
                  ].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Room Type:</strong> {editApp.roomType}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={editApp.notes || ""}
                  onChange={(e) =>
                    setEditApp({ ...editApp, notes: e.target.value })
                  }
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Notes:</strong> {editApp.notes || "No notes provided"}
                </Typography>
              )}

              {isEditing ? (
                <TextField
                  select
                  label="Status"
                  fullWidth
                  value={editApp.status || "pending"}
                  onChange={(e) =>
                    setEditApp({ ...editApp, status: e.target.value })
                  }
                >
                  {["pending", "confirmed", "rejected", "completed"].map(
                    (status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    )
                  )}
                </TextField>
              ) : (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Status:</strong>
                  <Chip
                    label={editApp.status}
                    color={getStatusColor(editApp.status)}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              )}

              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Created:</strong> {formatDate(editApp.createdAt)}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
                Package Information
              </Typography>

              {editApp.packageId ? (
                <>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Package Name:</strong>{" "}
                    {editApp.packageId.packageName}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Package ID:</strong> {editApp.packageId.travistaID}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Type:</strong> {editApp.packageId.packageType}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Price:</strong>{" "}
                    {editApp.packageId.packagePrice.amount}{" "}
                    {editApp.packageId.packagePrice.currency}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Departure Date:</strong>{" "}
                    {formatDate(editApp.packageId.departureDate)}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Destinations:</strong>{" "}
                    {editApp.packageId.destinations.join(", ")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Duration:</strong> {editApp.packageId.totalDays}{" "}
                    days, {editApp.packageId.totalNights} nights
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "primary.main" }}>
                      Hotels
                    </Typography>
                  </Box>

                  <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell>
                            <strong>Hotel</strong>
                          </TableCell>
                          <TableCell>
                            <strong>City</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Nights</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Single</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Double</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Triple</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {editApp.packageId.hotels.map((hotel, index) => (
                          <TableRow key={index}>
                            <TableCell>{hotel.hotelName}</TableCell>
                            <TableCell>{hotel.city}</TableCell>
                            <TableCell>{hotel.nights}</TableCell>
                            <TableCell>{hotel.single}</TableCell>
                            <TableCell>{hotel.double}</TableCell>
                            <TableCell>{hotel.triple}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "primary.main" }}>
                      Flights
                    </Typography>
                  </Box>

                  <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell>
                            <strong>Airline</strong>
                          </TableCell>
                          <TableCell>
                            <strong>From</strong>
                          </TableCell>
                          <TableCell>
                            <strong>To</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Date</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Departure</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Arrival</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {editApp.packageId.flights.map((flight, index) => (
                          <TableRow key={index}>
                            <TableCell>{flight.airline}</TableCell>
                            <TableCell>{flight.from}</TableCell>
                            <TableCell>{flight.to}</TableCell>
                            <TableCell>
                              {formatDate(flight.departureDate)}
                            </TableCell>
                            <TableCell>{flight.departureTime}</TableCell>
                            <TableCell>{flight.arrivalTime}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 3,
                      mb: 3,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <strong>Includes:</strong>
                      </Typography>
                      <ul style={{ marginTop: 0 }}>
                        {editApp.packageId.includes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <strong>Excludes:</strong>
                      </Typography>
                      <ul style={{ marginTop: 0 }}>
                        {editApp.packageId.excludes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      <strong>General Notes:</strong>
                    </Typography>
                    <ul style={{ marginTop: 0 }}>
                      {editApp.packageId.generalNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary">
                  No package information available
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ApplicationManager;
