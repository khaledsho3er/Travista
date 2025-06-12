import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ArticleForm = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    category: "",
    status: "Draft",
    featuredImage: null,
    tags: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://api.travistasl.com/api/articles/${id}`
        );
        setArticleData(response.data);
      } catch (error) {
        toast.error("Error fetching article");
      }
    };

    if (id) fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setArticleData({ ...articleData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setArticleData({ ...articleData, featuredImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(articleData).forEach((key) => {
      formData.append(key, articleData[key]);
    });

    try {
      if (id) {
        await axios.put(
          `https://api.travistasl.com/api/articles/${id}`,
          formData
        );
        toast.success("Article updated successfully!");
      } else {
        await axios.post("https://api.travistasl.com/api/articles", formData);
        toast.success("Article created successfully!");
      }
      navigate("/articles");
    } catch (error) {
      toast.error("Error saving article");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{id ? "Edit" : "New"} Article</Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Title"
          name="title"
          value={articleData.title}
          onChange={handleChange}
          fullWidth
          required
        />

        <ReactQuill
          value={articleData.content}
          onChange={(content) => setArticleData({ ...articleData, content })}
        />

        <Select
          name="category"
          value={articleData.category}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Tips">Tips</MenuItem>
          <MenuItem value="Guides">Guides</MenuItem>
        </Select>

        <Select
          name="status"
          value={articleData.status}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Draft">Draft</MenuItem>
          <MenuItem value="Published">Published</MenuItem>
          <MenuItem value="Scheduled">Scheduled</MenuItem>
        </Select>

        <TextField type="file" onChange={handleImageUpload} fullWidth />

        <TextField
          label="Tags (comma-separated)"
          name="tags"
          value={articleData.tags}
          onChange={handleChange}
          fullWidth
        />

        <Typography variant="h6">SEO Metadata</Typography>
        <TextField
          label="Meta Title"
          name="metaTitle"
          value={articleData.metaTitle}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Meta Description"
          name="metaDescription"
          value={articleData.metaDescription}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Meta Keywords (comma-separated)"
          name="metaKeywords"
          value={articleData.metaKeywords}
          onChange={handleChange}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary">
          {id ? "Update" : "Publish"} Article
        </Button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default ArticleForm;
