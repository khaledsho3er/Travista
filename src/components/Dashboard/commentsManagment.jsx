// pages/CommentManagement.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function CommentManagement() {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState({
    content: "",
    author: "",
    memberSince: "",
    isShow: false,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        "https://api.travistasl.com/api/comments/admin"
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e) => {
    setCurrentComment((prev) => ({ ...prev, isShow: e.target.checked }));
  };

  const handleOpen = (comment = null) => {
    if (comment) {
      setCurrentComment(comment);
    } else {
      setCurrentComment({
        content: "",
        author: "",
        memberSince: "",
        isShow: false,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (currentComment._id) {
        await axios.put(
          `https://api.travistasl.com/api/comments/${currentComment._id}`,
          currentComment
        );
      } else {
        await axios.post(
          "https://api.travistasl.com/api/comments",
          currentComment
        );
        console.log("Comment added successfully!");
      }
      fetchComments();
      handleClose();
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.travistasl.com/api/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleVisibility = async (id) => {
    try {
      await axios.patch(
        `https://api.travistasl.com/api/comments/${id}/toggle-visibility`
      );
      fetchComments();
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reviews Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Add New Comment
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Member Since</TableCell>
              <TableCell>Visible</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment, index) => (
              <TableRow
                key={comment._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                }}
              >
                <TableCell>
                  {comment.content.length > 50
                    ? `${comment.content.substring(0, 50)}...`
                    : comment.content}
                </TableCell>
                <TableCell>{comment.author}</TableCell>
                <TableCell>{comment.memberSince}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={comment.isShow}
                        onChange={() => toggleVisibility(comment._id)}
                        color="primary"
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(comment)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(comment._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentComment._id ? "Edit Comment" : "Add New Comment"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={currentComment.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            type="text"
            fullWidth
            variant="outlined"
            value={currentComment.author}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="memberSince"
            label="Member Since"
            type="text"
            fullWidth
            variant="outlined"
            value={currentComment.memberSince}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentComment.isShow}
                onChange={handleSwitchChange}
                name="isShow"
                color="primary"
              />
            }
            label="Show on Homepage"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CommentManagement;
