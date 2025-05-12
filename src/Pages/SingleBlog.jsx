import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Typography } from "@mui/material";

function SingleBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://158.220.96.121/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

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
              src={`https://158.220.96.121/uploads/${image}`}
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

  if (!blog) return <Typography>Loading...</Typography>;

  return (
    <Box>
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
          </Box>
        </header>
      </Box>
      <Box className="Single-Blog-image-hero">
        <img
          src={`https://158.220.96.121/uploads/${blog.featuredImage}`}
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
