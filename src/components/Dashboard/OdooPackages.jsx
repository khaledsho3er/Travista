// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Alert,
// } from "@mui/material";

// const OdooPackages = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOdooPackages = async () => {
//       try {
//         const response = await axios.post(
//           "https://travistaeg.com/api/list_crm_pacakge"
//         );
//         setPackages(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch packages from Odoo");
//         setLoading(false);
//         console.error("Error fetching Odoo packages:", err);
//       }
//     };

//     fetchOdooPackages();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="400px"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3}>
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Odoo Packages
//       </Typography>
//       <Card>
//         <CardContent>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Package ID</TableCell>
//                   <TableCell>Package Name</TableCell>
//                   <TableCell>Destination</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {packages.map((pkg) => (
//                   <TableRow key={pkg.id}>
//                     <TableCell>{pkg.id}</TableCell>
//                     <TableCell>{pkg.name}</TableCell>
//                     <TableCell>{pkg.destination}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default OdooPackages;
