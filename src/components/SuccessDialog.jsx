import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

/**
 * A reusable success dialog component that displays after form submission
 * 
 * @param {boolean} open - Controls whether the dialog is open
 * @param {function} onClose - Function to call when dialog is closed
 * @param {string} formType - Type of form that was submitted (e.g., "review", "contact", "visa", "package", "buildPackage")
 * @param {string} [customMessage] - Optional custom message to display instead of the default message for the form type
 * @param {string} [customTitle] - Optional custom title to display instead of the default title
 */
const SuccessDialog = ({ 
  open, 
  onClose, 
  formType, 
  customMessage, 
  customTitle 
}) => {
  // Define default messages based on form type
  const getDefaultContent = () => {
    switch (formType) {
      case "review":
        return {
          title: "Thank You for Your Review!",
          message: "Your feedback is valuable to us and helps improve our services for all travelers."
        };
      case "contact":
        return {
          title: "Message Received!",
          message: "Thank you for reaching out. We appreciate your message and will get back to you soon."
        };
      case "visa":
        return {
          title: "Visa Application Submitted!",
          message: "Your visa application has been successfully submitted. One of our visa specialists will contact you shortly to assist with the next steps."
        };
      case "package":
        return {
          title: "Package Application Submitted!",
          message: "Your package application has been received. Our travel experts will review your request and contact you soon to finalize your dream vacation."
        };
      case "buildPackage":
        return {
          title: "Custom Package Request Received!",
          message: "Thank you for your custom package request. Our team will design a personalized travel experience based on your preferences and will contact you within 24-48 hours."
        };
      default:
        return {
          title: "Submission Successful!",
          message: "Thank you for your submission. We'll process your request and get back to you soon."
        };
    }
  };

  const defaultContent = getDefaultContent();
  const title = customTitle || defaultContent.title;
  const message = customMessage || defaultContent.message;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
          position: "relative"
        }
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500"
        }}
      >
        <CloseIcon />
      </IconButton>
      
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          py={3}
        >
          <CheckCircleIcon 
            sx={{ 
              fontSize: 80, 
              color: "#142328",
              mb: 2
            }} 
          />
          
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            {message}
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: "#142328",
            color: "white",
            px: 4,
            py: 1,
            borderRadius: 6,
            "&:hover": {
              bgcolor: "#fff",
              color: "#142328",
              border: "1px solid #142328"
            }
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;