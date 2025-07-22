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
import { Helmet } from "react-helmet";

function BlogsPage() {
  const [blogData, setBlogData] = useState([]);
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All articles");
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    fetch("https://api.travistasl.com/api/blog")
      .then((response) => response.json())
      .then((data) => {
        // Only include blogs with status === "published"
        const publishedBlogs = data.filter(
          (blog) => blog.status === "published"
        );
        setBlogData(publishedBlogs);
      })
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
      <Helmet>
        <title>Travel Blogs & Stories | Travista Egypt</title>
        <meta
          name="description"
          content="Explore inspiring travel stories, guides, and tips from Travista. Stay updated with the latest travel trends and experiences from around the world."
        />
        <meta
          name="keywords"
          content="Travista blog, travel stories, travel guides, Egypt travel, travel inspiration, vacation tips, travel articles"
        />
        <meta
          property="og:title"
          content="Travel Blogs & Stories | Travista Egypt"
        />
        <meta
          property="og:description"
          content="Discover insightful travel content and personal experiences from explorers like you. From Egypt to the world, find your next travel idea here."
        />
        <meta
          property="og:image"
          content="https://travistaegypt.com/assets/Blog/blogheaderpic.png"
        />
        <meta property="og:url" content="https://travistaegypt.com/blogs" />
        <link rel="canonical" href="https://travistaegypt.com/blogs" />
      </Helmet>
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
            sx={{
              marginBottom: "1rem",
              width: "95%",
            }}
          >
            <MenuItem value="All articles">All articles</MenuItem>
            <MenuItem value="stories">Stories</MenuItem>
            <MenuItem value="news">News</MenuItem>
            <MenuItem value="guide">Guides</MenuItem>
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
              onClick={() => setSelectedCategory("stories")}
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
              onClick={() => setSelectedCategory("news")}
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
              onClick={() => setSelectedCategory("guide")}
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
            <Box
              className="Blog-card-image-container"
              sx={{
                position: "relative", // ✅ key to anchoring icon inside
                overflow: "hidden",
              }}
            >
              <Link
                to={`/singleblog/${blog.slug}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
                  alt={blog.title}
                  className="Blog-card-image"
                />
              </Link>
              <Typography className="Blog-category">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </Typography>
            </Box>
            <Box className="Blog-card-content">
              <Typography className="Blog-date">
                {new Date(blog.scheduledDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
              <Typography variant="h4" className="Blog-title">
                {blog.title.split(" ").length > 6
                  ? blog.title.split(" ").slice(0, 6).join(" ") + "..."
                  : blog.title}{" "}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.3rem",
                }}
              >
                {blog.tags &&
                  blog.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                        borderRadius: "12px",
                        padding: "2px 10px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </Box>
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
