import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VisaDocumentsTable() {
  const [visas, setVisas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editVisa, setEditVisa] = useState(null);
  const [form, setForm] = useState({ name: "", type: "", file: null });

  const fetchVisas = async () => {
    const res = await axios.get("https://158.220.96.121/api/visa-documents");
    setVisas(res.data);
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  const handleOpen = (visa = null) => {
    setEditVisa(visa);
    if (visa) {
      setForm({ name: visa.name, type: visa.type, file: null });
    } else {
      setForm({ name: "", type: "", file: null });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditVisa(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    if (form.file) formData.append("file", form.file);

    try {
      if (editVisa) {
        await axios.put(
          `https://158.220.96.121/api/visa-documents/${editVisa._id}`,
          formData
        );
        toast.success("Visa document updated successfully");
      } else {
        await axios.post("https://158.220.96.121/api/visa-documents", formData);
        toast.success("Visa document added successfully");
      }
      fetchVisas();
      handleClose();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://158.220.96.121/api/visa-documents/${id}`);
      toast.success("Visa document deleted successfully");
      fetchVisas();
    } catch (err) {
      toast.error("Error deleting visa document");
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Visa Documents Management
      </Typography>
      <Button variant="contained" onClick={() => handleOpen()}>
        Add Visa
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visas.map((visa) => (
            <TableRow key={visa._id}>
              <TableCell>{visa.name}</TableCell>
              <TableCell>{visa.type}</TableCell>
              <TableCell>
                <a href={`/${visa.fileUrl}`} target="_blank" rel="noreferrer">
                  View
                </a>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => handleOpen(visa)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(visa._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editVisa ? "Edit Visa" : "Add Visa"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Visa Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Visa Type"
            name="type"
            fullWidth
            value={form.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <input type="file" name="file" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editVisa ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default VisaDocumentsTable;
