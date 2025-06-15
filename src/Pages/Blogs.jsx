import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  useMediaQuery,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useUser } from "../utils/userContext"; // ✅ Add this
import FavoriteIcon from "@mui/icons-material/Favorite";

function BlogsPage() {
  const [blogData, setBlogData] = useState([]);
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("All articles");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [favoritedBlogs, setFavoritedBlogs] = useState([]);
  const { userSession } = useUser();
  useEffect(() => {
    fetch("https://api.travistasl.com/api/blog")
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userSession?._id) return;

      try {
        const response = await fetch(
          "https://api.travistasl.com/api/favorites/my",
          {
            headers: {
              Authorization: `Bearer ${userSession.token}`,
            },
          }
        );

        const data = await response.json();
        const blogIds = data
          .filter((fav) => fav.itemType === "blog")
          .map((fav) => fav.item._id);

        setFavoritedBlogs(blogIds);
      } catch (err) {
        console.error("Failed to load blog favorites", err);
      }
    };

    fetchFavorites();
  }, [userSession]);

  const handleViewMore = () => {
    setDisplayCount(displayCount + 9);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleFavorite = async (blogId) => {
    if (!userSession?._id) {
      alert("Please log in to favorite blogs.");
      return;
    }

    const isFavorited = favoritedBlogs.includes(blogId);

    try {
      if (isFavorited) {
        await fetch("https://api.travistasl.com/api/favorites/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
          body: JSON.stringify({ itemId: blogId, itemType: "blog" }),
        });

        setFavoritedBlogs((prev) => prev.filter((id) => id !== blogId));
      } else {
        await fetch("https://api.travistasl.com/api/favorites/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
          body: JSON.stringify({ itemId: blogId, itemType: "blog" }),
        });

        setFavoritedBlogs((prev) => [...prev, blogId]);
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
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
          <Card
            key={blog._id}
            sx={{
              width: 320,
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              boxShadow: 3,
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Link to={`/singleblog/${blog._id}`}>
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
                  alt={blog.title}
                />
              </Link>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(blog._id);
                }}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: favoritedBlogs.includes(blog._id)
                    ? "var(--maroon)"
                    : "white",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: "50%",
                  zIndex: 2,
                  padding: "6px",
                  "&:hover": {
                    color: "var(--maroon)",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  },
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>

              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  background: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {blog.category}
              </Typography>
            </Box>

            <CardContent sx={{ padding: 2 }}>
              <Typography variant="caption" sx={{ color: "#777" }}>
                {new Date(blog.date).toLocaleDateString()}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mt: 1, color: "var(--dark-green)" }}
              >
                {blog.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#444" }}>
                {blog.subTitle || blog.content?.slice(0, 80) + "..."}
              </Typography>
            </CardContent>
          </Card>
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
