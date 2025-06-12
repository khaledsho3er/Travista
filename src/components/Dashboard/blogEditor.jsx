import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageFile, setHeaderImageFile] = useState(null);
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // Handle Header Image Upload
  const handleHeaderImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeaderImage(URL.createObjectURL(file));
      setHeaderImageFile(file);
    }
  };

  // Handle Inline Image Upload
  const handleImageUpload = async () => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          // **Replace with actual image upload API**
          const imageUrl = URL.createObjectURL(file);
          resolve(imageUrl);
        }
      };
      input.click();
    });
  };

  // Handle Image Insertion
  const insertImage = async () => {
    const imageUrl = await handleImageUpload();
    setContent(content + `<img src="${imageUrl}" alt="Inline Image" />`);
  };

  // Save Blog Post
  const handleSave = async () => {
    if (!title || !content) {
      toast.warning("Title and content are required!");
      return;
    }

    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("metaTitle", metaTitle);
    blogData.append("metaDescription", metaDescription);
    blogData.append("metaKeywords", metaKeywords);
    if (headerImageFile) {
      blogData.append("headerImage", headerImageFile);
    }

    try {
      await axios.post("https://api.travistasl.com/api/blogs", blogData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog saved successfully!");
      setTitle("");
      setHeaderImage(null);
      setContent("");
      setMetaTitle("");
      setMetaDescription("");
      setMetaKeywords("");
    } catch (error) {
      toast.error("Error saving blog");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create a Blog Post
      </Typography>

      {/* Blog Title */}
      <TextField
        label="Blog Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Header Image Upload */}
      <Paper
        sx={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #aaa",
          cursor: "pointer",
          position: "relative",
          mb: 2,
        }}
        onClick={() => document.getElementById("headerImageInput").click()}
      >
        {headerImage ? (
          <img
            src={headerImage}
            alt="Header Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography>Click to upload a header image</Typography>
        )}
        <input
          type="file"
          id="headerImageInput"
          accept="image/*"
          onChange={handleHeaderImageUpload}
          style={{ display: "none" }}
        />
        <IconButton
          component="label"
          sx={{ position: "absolute", bottom: 10, right: 10, color: "#fff" }}
        >
          <PhotoCamera />
        </IconButton>
      </Paper>

      {/* Blog Content Editor */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Blog Content
      </Typography>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        style={{ height: "300px", marginBottom: "20px" }}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ align: [] }],
            ["clean"],
          ],
        }}
      />

      {/* Insert Inline Image Button */}
      <Button variant="contained" onClick={insertImage} sx={{ mt: 2, mb: 2 }}>
        Insert Image
      </Button>

      {/* SEO Fields */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        SEO Settings
      </Typography>
      <TextField
        label="Meta Title"
        variant="outlined"
        fullWidth
        value={metaTitle}
        onChange={(e) => setMetaTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Meta Description"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={metaDescription}
        onChange={(e) => setMetaDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Meta Keywords (comma-separated)"
        variant="outlined"
        fullWidth
        value={metaKeywords}
        onChange={(e) => setMetaKeywords(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Save Blog Button */}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Blog
      </Button>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default BlogEditor;
