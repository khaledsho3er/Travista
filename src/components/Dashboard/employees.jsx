import React, { useState, useEffect } from "react";
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
  Paper,
  Typography,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEmployee } from "../../utils/empContext"; // Import your EmpContext
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Delete, Edit } from "@mui/icons-material";

function Employees() {
  const { employee } = useEmployee(); // Get the logged-in employee from the context
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // For edit dialog
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    username: "",
    empId: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For selected employee in edit
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true); // Check if the employee is authorized

  // Only fetch employee data if the employee is authenticated and an admin
  useEffect(() => {
    if (!employee) {
      console.error("Employee not authenticated.");
      return; // Don't fetch if no employee is logged in
    }

    if (employee.role !== "admin") {
      setIsAuthorized(false);
      return;
    }

    fetch("https://158.220.96.121/api/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Send the session cookie with the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        return response.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [employee]); // Re-run effect when `employee` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
      const res = await fetch("https://158.220.96.121/api/empauth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send the session cookie with the request
        body: JSON.stringify(newEmployee),
      });

      if (!res.ok) {
        throw new Error("Failed to add employee");
      }

      const data = await res.json();
      setEmployees([...employees, data]);
      setNewEmployee({
        name: "",
        username: "",
        empId: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
      setOpen(false);
      toast.success("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error adding employee");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setNewEmployee(employee);
    setEditOpen(true);
  };

  const handleUpdateEmployee = async () => {
    try {
      const res = await fetch(
        `https://158.220.96.121/api/employees/${newEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Send the session cookie with the request
          body: JSON.stringify(newEmployee),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await res.json();
      setEmployees(
        employees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );
      setEditOpen(false);
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee");
    }
  };

  const handleDeleteEmployee = async (_id) => {
    try {
      const res = await fetch(`https://158.220.96.121/api/employees/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees(employees.filter((emp) => emp._id !== _id));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee");
    }
  };

  if (!isAuthorized) {
    return (
      <Dialog open={!isAuthorized}>
        <DialogTitle>Unauthorized</DialogTitle>
        <DialogContent>You are not authorized to view this page.</DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAuthorized(true)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Employees
      </Typography>
      <Button
        sx={{ mb: 2, mt: 2 }}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleEditEmployee(emp)}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDeleteEmployee(emp._id)}
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

      {/* Add Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            fullWidth
            value={newEmployee.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Employee ID"
            name="empId"
            fullWidth
            value={newEmployee.empId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            fullWidth
            value={newEmployee.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <MdOutlineVisibility />
                    ) : (
                      <MdOutlineVisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={newEmployee.phone}
            onChange={handleInputChange}
          />
          <Select
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            value={newEmployee.role}
            onChange={handleInputChange}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"marketingTeam"}>Marketing Team</MenuItem>
            <MenuItem value={"employee"}>Employee</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Username"
            name="username"
            fullWidth
            value={newEmployee.username}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Employee ID"
            name="empId"
            fullWidth
            value={newEmployee.empId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={newEmployee.phone}
            onChange={handleInputChange}
          />
          <Select
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            value={newEmployee.role}
            onChange={handleInputChange}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"marketingTeam"}>Marketing Team</MenuItem>
            <MenuItem value={"employee"}>Employee</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateEmployee} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}

export default Employees;
