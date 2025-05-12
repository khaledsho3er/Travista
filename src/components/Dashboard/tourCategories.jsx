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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourCategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  // Fetch tour categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://158.220.96.121/api/tour-categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    }
  };

  // Open the dialog (for adding/editing a category)
  const handleOpen = (category = null) => {
    setSelectedCategory(category);
    setCategoryData(
      category
        ? { name: category.name, description: category.description }
        : { name: "", description: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  // Handle input change
  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  // Add or Update Category
  const handleSave = async () => {
    if (!categoryData.name || !categoryData.description) {
      toast.warning("Please enter a valid category name and description.");
      return;
    }

    try {
      if (selectedCategory) {
        // Update Category
        await axios.put(
          `https://158.220.96.121/api/tour-categories/${selectedCategory._id}`,
          categoryData,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Tour Category updated successfully!");
      } else {
        // Add Category
        await axios.post(
          "https://158.220.96.121/api/tour-categories",
          categoryData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        toast.success("Tour Category added successfully!");
      }

      fetchCategories(); // Refresh category list
      handleClose(); // Close modal
    } catch (error) {
      console.error("Error saving tour category:", error);
      toast.error("Error saving tour category");
    }
  };

  // Delete Category
  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await axios.delete(
        `https://158.220.96.121/api/tour-categories/${categoryId}`
      );
      toast.success("Tour Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting tour category:", error);
      toast.error("Error deleting tour category");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Tour Categories
      </Typography>

      {/* Add Category Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ float: "right", mb: 2 }}
      >
        Add Category
      </Button>

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Category ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.tourCategoryId}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{`${category.description
                  .split(" ")
                  .slice(0, 6)
                  .join(" ")}...`}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleOpen(category)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Category Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {selectedCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Category Description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {selectedCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default TourCategoriesTable;
