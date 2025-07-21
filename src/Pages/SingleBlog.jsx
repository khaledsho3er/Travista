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
import DOMPurify from "dompurify";
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

  // Function to render content and insert embedded image after N words
  const renderContentWithEmbeddedImage = (
    content,
    embeddedImage,
    splitAt = 500
  ) => {
    if (!content) return null;

    // Remove HTML tags to count words
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const words = text.split(/\s+/);

    if (words.length <= splitAt || !embeddedImage) {
      // Not enough words or no image, just render the content
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      );
    }

    // Find the index in the HTML string where the split should happen
    let wordCount = 0;
    let splitIndex = 0;
    const html = content;
    const regex = /(\s+|<[^>]+>)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(html)) !== null) {
      if (!match[0].startsWith("<")) {
        // It's a space or word
        wordCount += match[0].trim() ? 1 : 0;
      }
      if (wordCount >= splitAt) {
        splitIndex = regex.lastIndex;
        break;
      }
      lastIndex = regex.lastIndex;
    }

    // If we didn't reach the split point, just render as is
    if (splitIndex === 0) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      );
    }

    const firstHalf = html.slice(0, splitIndex);
    const secondHalf = html.slice(splitIndex);

    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(firstHalf),
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "40px 0",
          }}
        >
          <img
            src={`https://api.travistasl.com/uploads/${embeddedImage}`}
            alt="Embedded Content"
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(secondHalf),
          }}
        />
      </>
    );
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
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "32px",
          }}
        />
      </Box>

      <Box className="Single-Blog-Content">
        <h3>{blog.contentTitle}</h3>
        {/* Render the blog content (handle HTML or plain text) */}
        {renderContentWithEmbeddedImage(blog.content, blog.embeddedImages, 500)}
      </Box>
      <Box className="Single-Blog-Back-btn" onClick={handleBacktoBlogs}>
        <button>Back to Blog</button>
      </Box>
      <Footer />
    </Box>
  );
}

export default SingleBlog;
