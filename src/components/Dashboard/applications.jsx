import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [viewApp, setViewApp] = useState(null);
  const [editApp, setEditApp] = useState(null);

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
    try {
      await axios.delete(`https://158.220.96.121/api/applications/${id}`);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const updateApplication = async () => {
    try {
      await axios.put(
        `https://158.220.96.121/api/applications/${editApp._id}`,
        editApp
      );
      setEditApp(null);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", padding: 16 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Applications Management
        </Typography>
      </div>

      {applications.map((app) => (
        <Card key={app._id} style={{ margin: 10 }}>
          <CardContent>
            <Typography variant="h6">
              {app.firstName} {app.lastName}
            </Typography>
            <Typography>Email: {app.email}</Typography>
            <Typography>Status: {app.status}</Typography>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <IconButton onClick={() => setViewApp(app)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => setEditApp(app)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteApplication(app._id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* View Modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)}>
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={"Assets/main-logo.png"}
              alt="Logo"
              style={{ height: 30 }}
            />
            <IconButton onClick={() => setViewApp(null)}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {viewApp?.firstName} {viewApp?.lastName}
          </Typography>
          <Typography>Email: {viewApp?.email}</Typography>
          <Typography>Phone: {viewApp?.phone}</Typography>
          <Typography>Status: {viewApp?.status}</Typography>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editApp} onClose={() => setEditApp(null)}>
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={"Assets/main-logo.png"}
              alt="Logo"
              style={{ height: 30 }}
            />
            <IconButton onClick={() => setEditApp(null)}>
              <CloseIcon />
            </IconButton>
          </div>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={editApp?.firstName || ""}
            onChange={(e) =>
              setEditApp({ ...editApp, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={editApp?.lastName || ""}
            onChange={(e) =>
              setEditApp({ ...editApp, lastName: e.target.value })
            }
          />
          <TextField
            label="Status"
            select
            fullWidth
            margin="normal"
            value={editApp?.status || "pending"}
            onChange={(e) => setEditApp({ ...editApp, status: e.target.value })}
          >
            {["pending", "confirmed", "rejected", "completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={updateApplication}
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ApplicationManager;
