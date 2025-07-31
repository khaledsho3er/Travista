import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete, ToggleOn, ToggleOff } from "@mui/icons-material";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleStatus,
} from "../../utils/bannerApis";

const BannerDashboard = () => {
  const [banners, setBanners] = useState([]);
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState("create");
  const [formData, setFormData] = useState({
    title: "",
    destinations: "",
    description: "",
    image: null,
    date: "", // NEW FIELD
  });
  const [selectedBannerId, setSelectedBannerId] = useState(null);

  const fetchBanners = async () => {
    const { data } = await getBanners();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleOpen = (type, banner = null) => {
    setFormType(type);
    setSelectedBannerId(banner?._id || null);
    if (type === "edit" && banner) {
      setFormData({
        title: banner.title,
        destinations: banner.destinations,
        description: banner.description,
        image: null,
        date: banner.date?.slice(0, 10) || "", // format YYYY-MM-DD
      });
    } else {
      setFormData({
        title: "",
        destinations: "",
        description: "",
        image: null,
        date: "", // do NOT access banner.date here since banner is null
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ title: "", destinations: "", description: "", image: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("destinations", formData.destinations);
      fd.append("description", formData.description);
      fd.append("date", formData.date); // Add date here
      if (formData.image) fd.append("image", formData.image);

      if (formType === "create") {
        await createBanner(fd);
        toast.success("Banner created successfully!");
      } else if (formType === "edit") {
        await updateBanner(selectedBannerId, fd);
        toast.success("Banner updated successfully!");
      }

      fetchBanners();
      handleClose();
    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Error saving banner");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      toast.success("Banner deleted successfully!");
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Error deleting banner");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleStatus(id);
      toast.success("Banner status updated successfully!");
      fetchBanners();
    } catch (error) {
      console.error("Error toggling banner status:", error);
      toast.error("Error updating banner status");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Manage Banners
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("create")}
      >
        Add New Banner
      </Button>

      <Box mt={4}>
        {banners.map((banner) => (
          <Stack
            key={banner._id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              padding: 2,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={`https://api.travistasl.com${banner.image}`}
                alt="Banner"
                style={{
                  width: 100,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Typography variant="h6">{banner.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(banner.date).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <IconButton onClick={() => handleToggle(banner._id)}>
                {banner.isActive === true ? (
                  <ToggleOn sx={{ color: "green", fontSize: 30 }} />
                ) : (
                  <ToggleOff sx={{ color: "gray", fontSize: 30 }} />
                )}
              </IconButton>
              <IconButton onClick={() => handleOpen("edit", banner)}>
                <Edit color="#ccc" />
              </IconButton>
              <IconButton onClick={() => handleDelete(banner._id)}>
                <Delete color="#ccc" />
              </IconButton>
            </Box>
          </Stack>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <DialogTitle>
          {formType === "create" ? "Add New Banner" : "Edit Banner"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Destinations"
            name="destinations"
            value={formData.destinations}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
          />
          <Button variant="outlined" component="label">
            {formData.image ? formData.image.name : "Upload Image"}
            <input type="file" name="image" hidden onChange={handleChange} />
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {formType === "create" ? "Create Banner" : "Update Banner"}
          </Button>
        </DialogContent>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default BannerDashboard;
