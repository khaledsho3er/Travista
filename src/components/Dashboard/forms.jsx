import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(
          "https://158.220.96.121/api/form-lead/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handleEditClick = (form) => {
    setSelectedForm(form);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (form) => {
    setSelectedForm(form);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`https://158.220.96.121/api/form-lead/${selectedForm._id}`, {
        method: "DELETE",
      });
      setForms(forms.filter((form) => form._id !== selectedForm._id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Forms Submissions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="form submissions table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form) => (
              <TableRow key={form._id}>
                <TableCell
                // sx={{
                //   borderRadius: "10px",
                //   padding: "15px 10px",
                //   textAlign: "center",
                //   width: "100px",
                //   color:
                //     form.type === "contactUs" ? "#897466FF" : "#759039FF",
                //   backgroundColor:
                //     form.type === "contactUs" ? "#ffd7be" : "#c7f464",
                // }}
                >
                  {form.type === "contactUs" ? "Contact Us" : "FAQs"}
                </TableCell>
                <TableCell>
                  {form.firstName} {form.lastName}
                </TableCell>
                <TableCell>{form.email}</TableCell>
                <TableCell>{form.phone}</TableCell>
                <TableCell>{form.subject}</TableCell>
                <TableCell>{form.message}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(form)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(form)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Form</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Subject"
            value={selectedForm?.subject || ""}
            onChange={(e) =>
              setSelectedForm({ ...selectedForm, subject: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={selectedForm?.message || ""}
            onChange={(e) =>
              setSelectedForm({ ...selectedForm, message: e.target.value })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this form submission?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Forms;
