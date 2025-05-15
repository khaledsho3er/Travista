import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState(null);
  const [mode, setMode] = useState("view");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get("https://158.220.96.121/api/users");
    setUsers(data);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`https://158.220.96.121/api/users/${id}`);
      fetchUsers();
    }
  };

  const openDialog = (user, action) => {
    setDialogUser(user);
    setMode(action);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    await axios.put(
      `https://158.220.96.121/api/users/${dialogUser._id}`,
      dialogUser
    );
    setDialogOpen(false);
    fetchUsers();
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Users Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openDialog(user, "view")}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openDialog(user, "edit")}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => deleteUser(user._id)}
                    color="error"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {mode === "edit" ? "Edit User" : "User Details"}
        </DialogTitle>
        <DialogContent>
          {dialogUser && (
            <Stack spacing={2} mt={1}>
              {mode === "view" ? (
                <>
                  <Typography>
                    <strong>Name:</strong> {dialogUser.firstName}{" "}
                    {dialogUser.lastName}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {dialogUser.email}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {dialogUser.phoneNumber}
                  </Typography>
                  <Typography>
                    <strong>Role:</strong> {dialogUser.role}
                  </Typography>
                </>
              ) : (
                <>
                  <TextField
                    label="First Name"
                    value={dialogUser.firstName}
                    fullWidth
                    onChange={(e) =>
                      setDialogUser({
                        ...dialogUser,
                        firstName: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Last Name"
                    value={dialogUser.lastName}
                    fullWidth
                    onChange={(e) =>
                      setDialogUser({ ...dialogUser, lastName: e.target.value })
                    }
                  />
                  <TextField
                    label="Email"
                    value={dialogUser.email}
                    fullWidth
                    onChange={(e) =>
                      setDialogUser({ ...dialogUser, email: e.target.value })
                    }
                  />
                  <TextField
                    label="Phone Number"
                    value={dialogUser.phoneNumber}
                    fullWidth
                    onChange={(e) =>
                      setDialogUser({
                        ...dialogUser,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Role"
                    value={dialogUser.role}
                    fullWidth
                    onChange={(e) =>
                      setDialogUser({ ...dialogUser, role: e.target.value })
                    }
                  />
                </>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          {mode === "edit" && (
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
