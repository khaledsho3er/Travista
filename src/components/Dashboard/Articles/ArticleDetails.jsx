import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CardMedia } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://158.220.96.121/api/articles/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        toast.error("Error fetching article");
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      await axios.delete(`https://158.220.96.121/api/articles/${id}`);
      toast.success("Article deleted successfully!");
      navigate("/articles"); // Redirect back to article list
    } catch (error) {
      toast.error("Error deleting article");
    }
  };

  if (!article) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{article.title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {article.category} | {article.status}
      </Typography>

      {article.featuredImage && (
        <CardMedia
          component="img"
          height="300"
          image={`https://158.220.96.121${article.featuredImage}`}
          alt="Featured Image"
          sx={{ mt: 2 }}
        />
      )}

      <Box sx={{ mt: 3 }}>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Tags:</Typography>
          <Typography variant="body2">{article.tags?.join(", ")}</Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">SEO Metadata:</Typography>
          <Typography variant="body2">
            Meta Title: {article.metaTitle}
          </Typography>
          <Typography variant="body2">
            Meta Description: {article.metaDescription}
          </Typography>
          <Typography variant="body2">
            Meta Keywords: {article.metaKeywords?.join(", ")}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate(`/articles/edit/${id}`)}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default ArticleDetails;
