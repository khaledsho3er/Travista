import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";

function DashboardHero() {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [heroList, setHeroList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);

  const fetchHeroes = async () => {
    try {
      const res = await axios.get("https://158.220.96.121/api/hero");
      setHeroList(res.data);
    } catch (err) {
      toast.error("Failed to fetch hero entries");
    }
  };

  const handleCreate = async () => {
    if (!caption || !imageFile) {
      toast.warn("Please provide both a caption and image.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", imageFile);
    formData.append("isActive", false);

    try {
      await axios.post("https://158.220.96.121/api/hero", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption("");
      setImageFile(null);
      toast.success("Hero created successfully!");
      fetchHeroes();
    } catch (err) {
      toast.error("Failed to create hero entry");
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.patch(`https://158.220.96.121/api/hero/activate/${id}`);
      toast.success("Hero set as active!");
      fetchHeroes();
    } catch (err) {
      toast.error("Failed to activate hero");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hero image?"))
      return;

    try {
      await axios.delete(`https://158.220.96.121/api/hero/${id}`);
      toast.success("Hero deleted successfully!");
      fetchHeroes();
    } catch (err) {
      toast.error("Failed to delete hero");
    }
  };

  const handleOpenDialog = (hero) => {
    setSelectedHero(hero);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHero(null);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Hero Section Management
      </Typography>
      <TextField
        label="Hero Caption"
        fullWidth
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "row",
          gap: 1,
          width: "35%",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" component="label">
          Upload Hero Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Button>

        {imageFile && (
          <Typography sx={{ mt: 1 }}>
            Selected Image: {imageFile.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ mt: 2 }}
        >
          Create New Hero
        </Button>
      </Box>

      <Typography variant="h5" sx={{ mb: 2 }}>
        All Hero Entries
      </Typography>

      <List>
        {heroList.map((hero) => (
          <ListItem
            key={hero._id}
            sx={{
              background: hero.isActive ? "#e0ffe0" : "#f5f5f5",
              mb: 1,
              borderRadius: 2,
            }}
            secondaryAction={
              <>
                {!hero.isActive && (
                  <IconButton
                    edge="end"
                    onClick={() => handleActivate(hero._id)}
                    title="Set as Active"
                  >
                    <CheckCircleIcon color="success" />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(hero._id)}
                  title="Delete Hero"
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            }
            onClick={() => handleOpenDialog(hero)}
          >
            <ListItemAvatar>
              <Avatar
                src={`https://158.220.96.121${hero.imageUrl}`}
                variant="square"
                sx={{ width: 70, height: 50, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={hero.caption}
              secondary={hero.isActive ? "Active" : "Inactive"}
            />
          </ListItem>
        ))}
      </List>

      {/* Dialog for Hero Section Simulation */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Hero Section Simulation</DialogTitle>
        <DialogContent>
          {selectedHero && (
            <Box
              sx={{
                background: `url(https://158.220.96.121${selectedHero.imageUrl})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "300px",
                width: "100%",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h4">{selectedHero.caption}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashboardHero;
