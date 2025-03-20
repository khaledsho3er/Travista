import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const BlogsForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [headings, setHeadings] = useState([{ id: uuidv4(), text: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      description,
      image,
      headings,
    };
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    blogs.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    navigate("/admin-dashboard");
  };

  const handleAddHeading = () => {
    setHeadings([...headings, { id: uuidv4(), text: "" }]);
  };

  const handleRemoveHeading = (id) => {
    setHeadings(headings.filter((heading) => heading.id !== id));
  };

  const handleHeadingChange = (id, text) => {
    setHeadings(
      headings.map((heading) =>
        heading.id === id ? { ...heading, text } : heading
      )
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "2rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Create a new blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: "1rem" }}
          multiline
          rows={4}
        />
        <TextField
          type="file"
          label="Image"
          variant="outlined"
          onChange={(e) => setImage(e.target.files[0])}
          sx={{ marginBottom: "1rem" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {headings.map((heading) => (
            <Box
              key={heading.id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                label="Heading"
                variant="outlined"
                value={heading.text}
                onChange={(e) =>
                  handleHeadingChange(heading.id, e.target.value)
                }
              />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleRemoveHeading(heading.id)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button variant="contained" onClick={handleAddHeading}>
            Add Heading
          </Button>
        </Box>
        <Button type="submit" variant="contained" sx={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BlogsForm;
