import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://api.travistasl.com/api/articles/articles"
      );
      setArticles(response.data);
    } catch (error) {
      toast.error("Error fetching articles");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Articles Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/admin/articles/new")}
      >
        New Article
      </Button>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article._id}>
            <Card
              onClick={() => navigate(`/articles/${article._id}`)}
              sx={{ cursor: "pointer" }}
            >
              {article.featuredImage && (
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://api.travistasl.com${article.featuredImage}`} // Display uploaded image
                  alt="Featured Image"
                />
              )}
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.category} | {article.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default ArticleList;
