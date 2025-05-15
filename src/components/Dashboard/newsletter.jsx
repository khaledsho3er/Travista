import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewsletterManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Fetch subscribers from API
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        "https://158.220.96.121/api/newsletter/subscribers"
      );
      setSubscribers(response.data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  // Open dialog for adding a subscriber
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };

  // Subscribe a new user
  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post(
        "https://158.220.96.121/api/newsletter/subscribe",
        { email }
      );
      toast.success(response.data.message);
      fetchSubscribers();
      handleClose();
    } catch (error) {
      toast.error(error.response?.data.message || "Subscription failed");
    }
  };

  // Unsubscribe a user
  const handleUnsubscribe = async (subscriberEmail) => {
    try {
      const response = await axios.put(
        "https://158.220.96.121/api/newsletter/unsubscribe",
        { email: subscriberEmail }
      );
      toast.info(response.data.message);
      fetchSubscribers();
    } catch (error) {
      toast.error(error.response?.data.message || "Unsubscribe failed");
    }
  };

  // Delete a subscriber
  const handleDelete = async (subscriberEmail) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?"))
      return;
    try {
      await axios.delete("https://158.220.96.121/api/newsletter/delete", {
        data: { email: subscriberEmail },
      });
      toast.success("Subscriber deleted successfully");
      fetchSubscribers();
    } catch (error) {
      toast.error(error.response?.data.message || "Delete failed");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Newsletter Subscribers
      </Typography>

      {/* Add Subscriber Button */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
        sx={{ float: "right", mb: 2 }}
      >
        Add Subscriber
      </Button>

      {/* Subscribers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Subscribed At</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.subscriberId}>
                <TableCell>{subscriber.subscriberId}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {subscriber.subscribed ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="red">Unsubscribed</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {subscriber.subscribed && (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleUnsubscribe(subscriber.email)}
                      sx={{ mr: 1 }}
                    >
                      Unsubscribe
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(subscriber.email)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Subscriber Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe to Newsletter</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default NewsletterManagement;
