import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useUser } from "../utils/userContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const { userSession } = useUser();
  useEffect(() => {
    fetch(`https://api.travistasl.com/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data); // ✅ set blog state

        // ✅ Check if this blog is already favorited
        if (userSession?._id) {
          fetch("https://api.travistasl.com/api/favorites/my", {
            headers: {
              Authorization: `Bearer ${userSession.token}`,
            },
          })
            .then((res) => res.json())
            .then((favorites) => {
              const isFav = favorites.some(
                (fav) => fav.itemType === "blog" && fav.item?._id === data._id
              );
              setIsFavorited(isFav);
            });
        }
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id, userSession]);

  const handleBacktoBlogs = () => {
    navigate("/Blogs");
  };

  // Check if content contains HTML and split it accordingly
  // Function to split content and insert image at placeholder
  const renderContent = (content, embeddedImages) => {
    const paragraphs = content.split("\n").map((text, index) => {
      if (index % 2 === 1 && embeddedImages && embeddedImages.length > 0) {
        // If there are embedded images, insert them
        const image = embeddedImages.shift(); // Remove the first image from the list
        return (
          <>
            <p key={`text-${index}`}>{text}</p>
            <img
              src={`https://api.travistasl.com/uploads/${image}`}
              alt="Embedded Content"
              key={`img-${index}`}
              style={{ width: "100%", margin: "20px 0" }}
            />
          </>
        );
      } else {
        return <p key={`text-${index}`}>{text}</p>;
      }
    });
    return paragraphs;
  };
  const handleFavoriteToggle = async () => {
    if (!userSession?._id) {
      alert("Please log in to save this blog.");
      return;
    }

    try {
      if (isFavorited) {
        await fetch("https://api.travistasl.com/api/favorites/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
          body: JSON.stringify({ itemId: blog._id, itemType: "blog" }),
        });
        setIsFavorited(false);
      } else {
        await fetch("https://api.travistasl.com/api/favorites/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userSession.token}`,
          },
          body: JSON.stringify({ itemId: blog._id, itemType: "blog" }),
        });
        setIsFavorited(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Helmet>
        <title>{blog.title} | Travista Egypt</title>
        <meta name="description" content={blog.subTitle} />
        <meta name="keywords" content={blog.seoKeywords?.join(", ")} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.subTitle} />
        <meta
          property="og:image"
          content={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://travista.vercel.app/Blogs/${id}`}
        />
        <link
          rel="canonical"
          href={`https://travista.vercel.app/Blogs/${id}`}
        />
      </Helmet>
      <Navbar />
      <Box className="Single-Blog-header">
        <header className="Single-Blog-header-container">
          <Box className="Single-Blog-date-container">
            <span className="Single-Blog-month">
              {new Date(blog.createdAt)
                .toLocaleString("default", { month: "long" })
                .toUpperCase()}{" "}
              {/* Converts the month to uppercase */}
            </span>
            <span className="Single-Blog-day">
              {new Date(blog.createdAt).getDate()} {/* Get day as number */}
            </span>
            <span className="Single-Blog-year">
              {new Date(blog.createdAt).getFullYear()}{" "}
              {/* Get year as number */}
            </span>
          </Box>
          <Box className="Single-Blog-content-container">
            <h1 className="Single-Blog-main-title">{blog.title}</h1>
            <p className="Single-Blog-subtitle">{blog.subTitle}</p>
          </Box>
          <Box className="Single-Blog-button-container">
            <button className="Single-Blog-action-button">Save</button>
            <button className="Single-Blog-action-button">Share</button>
            <IconButton
              onClick={handleFavoriteToggle}
              sx={{
                color: isFavorited ? "var(--maroon)" : "black",
                border: "1px solid",
                borderColor: isFavorited ? "var(--maroon)" : "gray",
                borderRadius: "50%",
                padding: "6px",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </header>
      </Box>
      <Box className="Single-Blog-image-hero">
        <img
          src={`https://api.travistasl.com/uploads/${blog.featuredImage}`}
          alt="Blog Hero"
        />
      </Box>

      <Box className="Single-Blog-Content">
        <h3>{blog.contentTitle}</h3>
        {/* Render the blog content (handle HTML or plain text) */}
        {renderContent(blog.content, blog.embeddedImages)}
      </Box>
      <Box className="Single-Blog-Back-btn" onClick={handleBacktoBlogs}>
        <button>Back to Blog</button>
      </Box>
      <Footer />
    </Box>
  );
}

export default SingleBlog;
