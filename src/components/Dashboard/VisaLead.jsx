import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VisaApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [emailNote, setEmailNote] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "https://api.travistasl.com/api/visa-leads"
      );
      // Sort by newest to oldest based on createdAt
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setApplications(sorted);
      setApplications(response.data);
    } catch (error) {
      toast.error("Error fetching visa applications");
    }
  };

  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setStatus(application.status);
    setEmailNote(application.emailNote || "");
    setOpenEdit(true);
  };

  const handleDeleteClick = (application) => {
    setSelectedApplication(application);
    setOpenDelete(true);
  };

  const handleUpdateApplication = async () => {
    try {
      await axios.put(
        `https://api.travistasl.com/api/visa-leads/${selectedApplication._id}`,
        { status, emailNote }
      );
      fetchApplications();
      setOpenEdit(false);
      toast.success("Application updated successfully!");
    } catch (error) {
      toast.error("Error updating application");
    }
  };

  const handleDeleteApplication = async () => {
    try {
      await axios.delete(
        `https://api.travistasl.com/api/visa-leads/${selectedApplication._id}`
      );
      fetchApplications();
      setOpenDelete(false);
      toast.success("Application deleted successfully!");
    } catch (error) {
      toast.error("Error deleting application");
    }
  };
  const paginatedData = applications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Visa Applications
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Country</strong>
              </TableCell>
              <TableCell>
                <strong>Purpose</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((app) => (
              <TableRow key={app._id}>
                <TableCell>
                  {app.firstName} {app.lastName}
                </TableCell>
                <TableCell>{app.phoneNumber}</TableCell>
                <TableCell>{app.country}</TableCell>
                <TableCell>{app.purpose}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(app)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(app)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(applications.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="md" // Makes the dialog 70% wide
        sx={{
          "& .MuiDialog-paper": { width: "70%" }, // Adjusts dialog width
        }}
      >
        <DialogTitle>Edit Visa Application</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 3 }}>
            {/* Left Column - User Information */}
            <Box sx={{ flex: 1, borderRight: "1px solid #ddd", pr: 3 }}>
              <Typography>
                <strong>Name:</strong> {selectedApplication?.firstName}{" "}
                {selectedApplication?.lastName}
              </Typography>
              <Typography>
                <strong>Country:</strong> {selectedApplication?.country}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {selectedApplication?.phoneNumber}
              </Typography>
              <Typography>
                <strong>Purpose:</strong> {selectedApplication?.purpose}
              </Typography>
              <Typography>
                <strong>Invitation:</strong> {selectedApplication?.invitation}
              </Typography>
              <Typography>
                <strong>Schengen Before:</strong>{" "}
                {selectedApplication?.schengenBefore}
              </Typography>
              <Typography>
                <strong>Job Status:</strong> {selectedApplication?.jobStatus}
              </Typography>
              <Typography>
                <strong>First Time to apply:</strong>{" "}
                {selectedApplication?.visaRenewal}
              </Typography>
              <Typography>
                <strong>Visa Type:</strong> {selectedApplication?.visaType}
              </Typography>
              <Typography>
                <strong>Travel Date:</strong>{" "}
                {new Date(selectedApplication?.travelDate).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Submitted Date:</strong>{" "}
                {new Date(selectedApplication?.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            {/* Right Column - Status & Email Note */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ mb: 2 }}>
                <strong>Bank Statement:</strong>
                {selectedApplication?.bankStatement}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Additional Files:</strong>
              </Typography>
              {selectedApplication?.additionalFiles &&
              selectedApplication.additionalFiles.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    maxHeight: "200px",
                    overflowY: "auto",
                    p: 1,
                    border: "1px solid #eee",
                    borderRadius: 1,
                    bgcolor: "#f9f9f9",
                  }}
                >
                  {selectedApplication.additionalFiles.map((file, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        borderRadius: 1,
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#f0f0f0",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "70%",
                        }}
                      >
                        {file.split("/").pop()}
                      </Typography>
                      <a
                        href={`https://api.travistasl.com/uploads/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "#1976d2",
                          fontWeight: 500,
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        View File
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  No additional files uploaded
                </Typography>
              )}

              <TextField
                label="Email Note"
                multiline
                rows={3}
                fullWidth
                value={emailNote}
                onChange={(e) => setEmailNote(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Typography sx={{ mb: 1 }}>
                <strong>Status:</strong>
              </Typography>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateApplication} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this visa application?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteApplication} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default VisaApplicationsTable;
