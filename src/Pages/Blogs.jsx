import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
function BlogsPage() {
  const [blogData, setBlogData] = useState([]);
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All articles");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetch("https://158.220.96.121/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

  const handleViewMore = () => {
    setDisplayCount(displayCount + 9);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const displayedBlogs = blogData
    .filter((blog) =>
      selectedCategory === "All articles"
        ? true
        : blog.category === selectedCategory
    )
    .slice(0, displayCount);

  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box className="Blogs-header">
        <img
          src="assets/Blog/blogheaderpic.png"
          alt="loading"
          className="Blogs-center-img"
        />
        <Typography variant="h4">Travel stories that inspire you.</Typography>
      </Box>
      <img src="assets/Blog/people.png" alt="loading" className="people-pic" />
      <hr style={{ width: "90%" }}></hr>

      <Box
        sx={{
          display: isMobile ? "block" : "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "flex-start",
          paddingLeft: isMobile ? "1rem" : "3rem",
          paddingTop: "2rem",
        }}
      >
        {isMobile ? (
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            fullWidth
            sx={{ marginBottom: "1rem" }}
          >
            <MenuItem value="All articles">All articles</MenuItem>
            <MenuItem value="Stories">Stories</MenuItem>
            <MenuItem value="News">News</MenuItem>
            <MenuItem value="Guides">Guides</MenuItem>
          </Select>
        ) : (
          <>
            <Button
              onClick={() => setSelectedCategory("All articles")}
              sx={{
                border: "1px solid black",
                borderRadius: "20px",
                fontSize: "0.6rem",
                width: "8%",
                height: "10%",
                background: selectedCategory === "All articles" ? "black" : "",
                color: selectedCategory === "All articles" ? "white" : "black",
              }}
            >
              All articles
            </Button>
            <Button
              onClick={() => setSelectedCategory("Stories")}
              sx={{
                border: "1px solid black",
                borderRadius: "20px",
                fontSize: "0.6rem",
                width: "8%",
                height: "10%",
                color: "black",
              }}
            >
              Stories
            </Button>
            <Button
              onClick={() => setSelectedCategory("News")}
              sx={{
                border: "1px solid black",
                borderRadius: "20px",
                fontSize: "0.6rem",
                width: "8%",
                height: "10%",
                color: "black",
              }}
            >
              News
            </Button>
            <Button
              onClick={() => setSelectedCategory("Guides")}
              sx={{
                border: "1px solid black",
                borderRadius: "20px",
                fontSize: "0.6rem",
                width: "8%",
                height: "10%",
                color: "black",
              }}
            >
              Guides
            </Button>
          </>
        )}
      </Box>

      <Box className="Blogs-grid">
        {displayedBlogs.map((blog) => (
          <Box key={blog._id} className="Blog-card">
            <Box className="Blog-card-image-container">
              <Link
                to={`/singleblog/${blog._id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`https://158.220.96.121/uploads/${blog.featuredImage}`}
                  alt={blog.title}
                  className="Blog-card-image"
                />
              </Link>
              <Typography className="Blog-category">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Typography>
            </Box>
            <Box className="Blog-card-content">
              <Typography className="Blog-date">{blog.date}</Typography>
              <Typography variant="h4" className="Blog-title">
                {blog.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {displayCount < blogData.length && (
        <box className="Single-Blog-Back-btn">
          <button onClick={handleViewMore}> View More</button>
        </box>
      )}

      <Footer />
    </Box>
  );
}

export default BlogsPage;
