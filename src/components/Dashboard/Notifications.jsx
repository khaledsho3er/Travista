import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Chip,
  Modal,
  Button,
  Tooltip,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "https://api.travistasl.com/api/notifications"
      );
      setNotifications(response.data);
    } catch (error) {
      toast.error("Error fetching notifications");
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      setLoading(true);
      await axios.patch(
        `https://api.travistasl.com/api/notifications/${id}/read`,
        {
          id,
        }
      );
      toast.success("Notification marked as read");
      fetchNotifications();
    } catch (error) {
      toast.error("Error marking notification as read");
      console.error("Error marking as read:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Comment":
        return "primary";
      case "Application":
        return "success";
      case "Package":
        return "warning";
      case "User":
        return "info";
      default:
        return "default";
    }
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "500px" },
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Notifications
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow
                key={notification._id}
                hover
                sx={{
                  backgroundColor: notification.isRead
                    ? "inherit"
                    : "rgba(25, 118, 210, 0.05)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedNotification(notification)}
              >
                <TableCell>
                  <Chip
                    label={notification.type}
                    color={getTypeColor(notification.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      maxWidth: "400px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontWeight: notification.isRead ? "normal" : "bold",
                    }}
                  >
                    {notification.description}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(notification.date)}</TableCell>
                <TableCell>
                  <Chip
                    label={notification.isRead ? "Read" : "Unread"}
                    color={notification.isRead ? "default" : "primary"}
                    size="small"
                    variant={notification.isRead ? "outlined" : "filled"}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNotification(notification);
                      }}
                      color="primary"
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {!notification.isRead && (
                    <Tooltip title="Mark as Read">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification._id);
                        }}
                        color="success"
                        size="small"
                        disabled={loading}
                      >
                        <MarkEmailReadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {notifications.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ py: 2 }}>
                    No notifications found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Notification Detail Modal */}
      <Modal
        open={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
      >
        <Box sx={modalStyle}>
          {selectedNotification && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src="assets/main-logo.png"
                    alt="Travista Logo"
                    style={{ height: "40px" }}
                  />
                  <Typography variant="h6">
                    {selectedNotification.type} Notification
                  </Typography>
                </Box>
                <IconButton onClick={() => setSelectedNotification(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedNotification.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Received: {formatDate(selectedNotification.date)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Chip
                  label={selectedNotification.isRead ? "Read" : "Unread"}
                  color={selectedNotification.isRead ? "default" : "primary"}
                />
                {!selectedNotification.isRead && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MarkEmailReadIcon />}
                    onClick={() => {
                      markAsRead(selectedNotification._id);
                      setSelectedNotification(null);
                    }}
                    disabled={loading}
                  >
                    Mark as Read
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default NotificationsTable;
