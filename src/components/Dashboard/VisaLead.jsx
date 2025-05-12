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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("https://158.220.96.121/api/visa-leads");
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
        `https://158.220.96.121/api/visa-leads/${selectedApplication._id}`,
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
        `https://158.220.96.121/api/visa-leads/${selectedApplication._id}`
      );
      fetchApplications();
      setOpenDelete(false);
      toast.success("Application deleted successfully!");
    } catch (error) {
      toast.error("Error deleting application");
    }
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
            {applications.map((app) => (
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
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleEditClick(app)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    startIcon={<Delete />}
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
                <strong>Visa Renewal:</strong>{" "}
                {selectedApplication?.visaRenewal}
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
                <strong>Bank Statement:</strong>{" "}
                <a
                  href={selectedApplication?.bankStatement}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  {selectedApplication?.bankStatement}
                </a>
              </Typography>
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
