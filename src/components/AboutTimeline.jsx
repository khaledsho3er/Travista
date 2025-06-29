import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const milestones = [
  "Travista was founded with a vision to make travel accessible for everyone.",
  "Launched our first group tour, connecting travelers from different backgrounds.",
  "Expanded our destinations to include over 20 countries worldwide.",
  "Introduced personalized travel packages for unique customer experiences.",
  "Partnered with leading airlines and hotels for exclusive deals.",
  "Launched our user-friendly online booking platform.",
  "Reached 10,000 happy travelers milestone.",
  "Introduced 24/7 customer support for seamless travel assistance.",
];

function Timeline() {
  const containerRef = useRef();
  const cardRefs = useRef([]);
  const [points, setPoints] = useState([]);
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Reveal animation trigger
  useEffect(() => {
    const node = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  // Measure layout once visible with small delay
  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      updatePoints();
    }, 100); // 100ms gives Chrome time to stabilize layout

    return () => clearTimeout(timeout);
  }, [visible]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => updatePoints();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updatePoints = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPoints = cardRefs.current.map((ref) => {
      if (!ref) return null;
      const cardRect = ref.getBoundingClientRect();
      return {
        x: cardRect.left + cardRect.width / 2 - containerRect.left,
        y: cardRect.top + cardRect.height / 2 - containerRect.top,
      };
    });
    setPoints(newPoints.filter(Boolean));
  };

  const generatePath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const deltaX = curr.x - prev.x;
      const control1 = { x: prev.x + deltaX * 0.3, y: prev.y };
      const control2 = { x: curr.x - deltaX * 0.3, y: curr.y };
      d += ` C ${control1.x},${control1.y} ${control2.x},${control2.y} ${curr.x},${curr.y}`;
    }
    return d;
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: `${milestones.length * (isMobile ? 160 : 130)}px`,
        paddingTop: "50px",
        paddingBottom: "150px", // prevents clipping into footer
        backgroundImage: 'url("assets/About/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Timeline Path */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <path
          d={generatePath()}
          fill="none"
          stroke="#f7a9a8"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: 10000,
            strokeDashoffset: 10000,
            animation: visible ? "drawLine 3s ease forwards" : "none",
          }}
        />
      </svg>

      {/* Milestone Cards */}
      {milestones.map((text, index) => (
        <Box
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          sx={{
            position: "absolute",
            width: isMobile ? "80%" : 200,
            left: isMobile ? "50%" : index % 2 === 0 ? "25%" : "60%",
            transform: isMobile ? "translateX(-50%)" : "none",
            top: `${5 + index * (isMobile ? 17 : 12)}%`,
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            zIndex: 2,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Milestone {index + 1}</h3>
          <p>{text}</p>
        </Box>
      ))}

      {/* Keyframe animation */}
      <style>
        {`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default Timeline;
