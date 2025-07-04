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
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useEmployee } from "../../utils/empContext"; // Import your EmpContext
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    active: true, // Default to active
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true); // Check if the employee is authorized
  const token = localStorage.getItem("employee-token");

  // Only fetch employee data if the employee is authenticated and an admin
  useEffect(() => {
    if (!employee) return;
    if (employee.role !== "admin") return setIsAuthorized(false);

    fetch("https://api.travistasl.com/api/employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setEmployees)
      .catch(console.error);
  }, [employee, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setNewEmployee({ ...newEmployee, active: e.target.checked });
  };

  const handleAddEmployee = async () => {
    try {
      const res = await fetch(
        "https://api.travistasl.com/api/empauth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newEmployee),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add employee");
      }

      const data = await res.json();
      setEmployees([...employees, data]);

      // Reset form fields to initial state
      setNewEmployee({
        name: "",
        username: "",
        empId: "",
        email: "",
        password: "",
        phone: "",
        role: "",
        active: true, // Default to active
      });

      // Reset password visibility
      setShowPassword(false);

      // Close the dialog
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
    setSelectedEmployee(employee); // Correct usage now
    setNewEmployee({ ...employee }); // Fix spread issue
    setEditOpen(true);
  };

  const handleUpdateEmployee = async () => {
    try {
      const res = await fetch(
        `https://api.travistasl.com/api/employees/${newEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      const res = await fetch(
        `https://api.travistasl.com/api/employees/${_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

  const handleToggleActive = async (id, newActiveState) => {
    try {
      // Immediately update the UI for better responsiveness
      setEmployees(
        employees.map((emp) =>
          emp._id === id ? { ...emp, active: newActiveState } : emp
        )
      );

      const res = await fetch(
        `https://api.travistasl.com/api/employees/${id}/toggle-status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: newActiveState }),
        }
      );

      if (!res.ok) {
        // If the API call fails, revert the UI change
        setEmployees(
          employees.map((emp) =>
            emp._id === id ? { ...emp, active: !newActiveState } : emp
          )
        );
        throw new Error("Failed to update employee status");
      }

      const updatedEmployee = await res.json();
      // Update with the server response to ensure consistency
      setEmployees(
        employees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );
      toast.success(
        `Employee ${newActiveState ? "activated" : "deactivated"} successfully!`
      );
    } catch (error) {
      console.error("Error updating employee status:", error);
      toast.error("Error updating employee status");
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp, index) => (
              <TableRow
                key={emp._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9",
                }}
              >
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.role}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emp.active === true}
                        onChange={() =>
                          handleToggleActive(emp._id, !emp.active)
                        }
                        color="primary"
                      />
                    }
                    label={emp.active === true ? "Active" : "Inactive"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditEmployee(emp)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteEmployee(emp._id)}
                    color="error"
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ backdropFilter: "blur(5px)" }}
      >
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
          <FormControlLabel
            control={
              <Switch
                checked={newEmployee.active}
                onChange={handleSwitchChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
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
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <DialogTitle>
          Edit Employee {selectedEmployee ? `: ${selectedEmployee.name}` : ""}
        </DialogTitle>
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
          <FormControlLabel
            control={
              <Switch
                checked={newEmployee.active !== false}
                onChange={handleSwitchChange}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
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
