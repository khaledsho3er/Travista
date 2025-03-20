import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("/json/notifications.json")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Sender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{notification.id}</TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell>{notification.sender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NotificationsTable;
