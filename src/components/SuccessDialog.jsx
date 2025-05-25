import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion"; // Import framer-motion

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
  customTitle,
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Reset animation state when dialog opens
  useEffect(() => {
    if (open) {
      setAnimationComplete(false);
    }
  }, [open, animationComplete]);

  // Define default messages based on form type
  const getDefaultContent = () => {
    switch (formType) {
      case "review":
        return {
          title: "Thank You for Your Review!",
          message:
            "Your feedback is valuable to us and helps improve our services for all travelers.",
        };
      case "contact":
        return {
          title: "Message Received!",
          message:
            "Thank you for reaching out. We appreciate your message and will get back to you soon.",
        };
      case "visa":
        return {
          title: "Visa Application Submitted!",
          message:
            "Your visa application has been successfully submitted. One of our visa specialists will contact you shortly to assist with the next steps.",
        };
      case "package":
        return {
          title: "Package Application Submitted!",
          message:
            "Your package application has been received. Our travel experts will review your request and contact you soon to finalize your dream vacation.",
        };
      case "buildPackage":
        return {
          title: "Custom Package Request Received!",
          message:
            "Thank you for your custom package request. Our team will design a personalized travel experience based on your preferences and will contact you within 24-48 hours.",
        };
      default:
        return {
          title: "Submission Successful!",
          message:
            "Thank you for your submission. We'll process your request and get back to you soon.",
        };
    }
  };

  const defaultContent = getDefaultContent();
  const title = customTitle || defaultContent.title;
  const message = customMessage || defaultContent.message;

  // Animation variants for the circle
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  // Animation variants for the check mark
  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut", delay: 1 },
        opacity: { duration: 0.3, delay: 1 },
      },
    },
  };

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
          position: "relative",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
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
          <Box
            sx={{
              width: 100,
              height: 100,
              position: "relative",
              mb: 2,
            }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="100"
              height="100"
              initial="hidden"
              animate="visible"
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              {/* Circle */}
              <motion.path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                fill="none"
                stroke="#142328"
                strokeWidth="1.5"
                variants={circleVariants}
              />

              {/* Check mark */}
              <motion.path
                d="M7 13l3 3 7-7"
                fill="none"
                stroke="#142328"
                strokeWidth="1.5"
                variants={checkVariants}
              />
            </motion.svg>
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, mb: 3 }}
          >
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
              border: "1px solid #142328",
            },
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
