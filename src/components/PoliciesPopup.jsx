import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const policyContent = {
  privacy: {
    title: "Privacy Policy",
    content: `**Your Privacy Matters**\n\nAt Travista, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.\n\n**Information We Collect**\n- Personal identification information (Name, email address, phone number, etc.)\n- Usage data (pages visited, time spent, etc.)\n- Cookies and tracking technologies\n\n**How We Use Your Information**\n- To provide and maintain our services\n- To improve user experience\n- To send periodic emails and updates\n- To comply with legal obligations\n\n**Sharing Your Information**\nWe do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.\n\n**Your Rights**\nYou have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@travistasl.com.\n\n**Changes to This Policy**\nWe may update our Privacy Policy from time to time. Any changes will be posted on this page.`,
  },
  terms: {
    title: "Terms & Conditions",
    content: `**Welcome to Travista**\n\nBy accessing or using our website and services, you agree to be bound by these Terms & Conditions.\n\n**Use of the Site**\n- You must be at least 18 years old to use our services.\n- You agree not to use the site for any unlawful purpose.\n\n**Intellectual Property**\nAll content, trademarks, and data on this site are the property of Travista or its licensors and are protected by copyright and intellectual property laws.\n\n**Limitation of Liability**\nTravista is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or services.\n\n**Governing Law**\nThese terms are governed by the laws of your country/state.\n\n**Changes to Terms**\nWe reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.`,
  },
  cookie: {
    title: "Cookie Policy",
    content: `**How We Use Cookies**\n\nTravista uses cookies to enhance your browsing experience and provide personalized content.\n\n**What Are Cookies?**\nCookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you use our site.\n\n**Types of Cookies We Use**\n- Essential cookies: Necessary for website functionality\n- Analytics cookies: Help us understand website usage\n- Marketing cookies: Used to deliver relevant ads\n\n**Managing Cookies**\nYou can control and delete cookies through your browser settings. However, disabling cookies may affect your experience on our site.\n\n**Contact Us**\nIf you have any questions about our Cookie Policy, please contact us at info@travistasl.com.`,
  },
};

const PoliciesPopup = ({ open, onClose, defaultSection }) => {
  const [expanded, setExpanded] = useState(defaultSection || "privacy");

  React.useEffect(() => {
    if (open && defaultSection) {
      setExpanded(defaultSection);
    }
  }, [open, defaultSection]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Helper to render markdown-like line breaks and bold
  const renderContent = (text) => {
    return text.split("\n").map((line, idx) => {
      // Bold
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <Typography
            key={idx}
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mt: idx === 0 ? 0 : 2 }}
          >
            {line.replace(/\*\*/g, "")}
          </Typography>
        );
      }
      // List
      if (line.trim().startsWith("- ")) {
        return (
          <li key={idx} style={{ marginLeft: 16 }}>
            {line.replace("- ", "")}
          </li>
        );
      }
      // Normal
      return (
        <Typography key={idx} variant="body2" sx={{ mt: 0.5 }}>
          {line}
        </Typography>
      );
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          maxWidth: "700px",
          width: "95%",
          padding: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 0 24px",
        }}
      >
        <Typography variant="h5" fontWeight="bold"></Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: "24px" }}>
        <Box>
          <Accordion
            expanded={expanded === "privacy"}
            onChange={handleAccordionChange("privacy")}
            sx={{ mb: 2, boxShadow: "none" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="#750046">
                {policyContent.privacy.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderContent(policyContent.privacy.content)}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "terms"}
            onChange={handleAccordionChange("terms")}
            sx={{ mb: 2, boxShadow: "none" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="#750046">
                {policyContent.terms.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderContent(policyContent.terms.content)}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "cookie"}
            onChange={handleAccordionChange("cookie")}
            sx={{ boxShadow: "none" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" color="#750046">
                {policyContent.cookie.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {renderContent(policyContent.cookie.content)}
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PoliciesPopup;
