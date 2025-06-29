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
    content: `1. Introduction\nWelcome to Travista. By accessing or using travistasl.com, you agree to comply with these Terms & Conditions. If you're using the site on behalf of someone else or a company, you represent that you have authority to do so.\n\n2. Eligibility\nYou must be at least 18 years old to use this site. By using our services, you confirm you meet this requirement.\n\n3. Services\nWe provide travel services—including flights, hotels, package tours, visas, and related offerings. Additional Terms may apply to specific services or bookings.\n\n4. Accounts & Registration\nCreating an account requires providing accurate information and keeping your credentials secure. You're responsible for all activity under your account, and must notify us immediately of any unauthorized access.\n\n5. User Conduct\nYou agree not to:\nViolate laws or infringe rights of third parties\nUse site to defraud, spam, or harvest others' data\nUpload harmful code or attempt to disrupt site functionality\n\n6. Intellectual Property\nAll content on this site—text, graphics, logos, images—is owned or licensed by us. You may view and download for personal use only. Any other exploitation is prohibited.\n\n7. Third‑Party Links & Services\nWe may link to third-party websites or integrate third-party services. We're not responsible for their content or policies. Please review their Terms and Privacy Policies before use.\n\n8. Pricing, Payment & Booking\nAll prices and availability are subject to change until confirmed via booking.\nPayments must be made using authorized payment methods.\nYou agree to pay the total price plus applicable fees and taxes.\n\n9. Cancellations & Refunds\nCancellations follow our separate cancellation policy, which will be provided at booking. Refunds are processed only if permitted under that policy.\n\n10. Disclaimers & Warranties\nWe provide services "as is" without warranties (express or implied) regarding accuracy, reliability, fitness for purpose, or availability.\nWe do not guarantee uninterrupted, secure, or error-free operation.\nWe're not liable for delays, cancellations, or losses related to third-party suppliers.\n\n11. Limitation of Liability\nTo the maximum extent permitted by law, we and our affiliates aren't liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the site or services—even if advised of possible damages.\n\n12. Indemnification\nYou agree to indemnify and hold us harmless from any claims, losses, or liabilities (including legal fees) arising from your breach of these Terms, your use of the site, or violation of laws.\n\n13. Governing Law & Dispute Resolution\nThese Terms are governed by the laws of Egypt. You agree that any disputes will be resolved in the courts of Egypt. Arbitration or mediation may be used if we both agree in writing.\n\n14. Modifications\nWe reserve the right to revise these Terms at any time. Changes become effective upon posting. Your continued use after changes means you accept the updated Terms. We recommend reviewing this page regularly.\n\n15. Severability\nIf any provision of these Terms is found invalid or unenforceable, that part will be removed and the remainder will continue in full force.`,
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
