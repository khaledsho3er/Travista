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
  "Launched eco-friendly travel initiatives to promote sustainable tourism.",
  "Recognized as a top travel agency in the region.",
  "Expanded our team with passionate travel experts.",
  "Continuing to innovate and inspire journeys for travelers worldwide.",
];

function Timeline() {
  const containerRef = useRef();
  const cardRefs = useRef([]);
  const observerRef = useRef();
  const [points, setPoints] = useState([]);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerAnimation(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  useEffect(() => {
    const newPoints = cardRefs.current.map((ref) => {
      if (ref && containerRef.current) {
        const cardRect = ref.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
          x: cardRect.left + cardRect.width / 2 - containerRect.left,
          y: cardRect.top + cardRect.height / 2 - containerRect.top,
        };
      }
      return null;
    });
    setPoints(newPoints.filter(Boolean));
  }, [triggerAnimation]); // recalculate when animation starts (after scroll in)

  const generatePath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2;
      d += ` Q ${prev.x},${prev.y} ${cx},${cy}`;
    }
    return d;
  };

  return (
    <Box
      ref={(el) => {
        containerRef.current = el;
        observerRef.current = el;
      }}
      sx={{
        position: "relative",
        height: isMobile ? "280vh" : "200vh",
        width: "100%",
        backgroundImage: 'url("assets/About/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem 0",
      }}
    >
      {/* Animated pink timeline */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
            animation: triggerAnimation ? "drawLine 3s ease forwards" : "none",
          }}
        />
      </svg>

      {/* Cards */}
      {milestones.map((text, index) => (
        <Box
          key={index}
          ref={(el) => (cardRefs.current[index] = el)}
          sx={{
            position: "absolute",
            width: isMobile ? "80%" : 200,
            left: isMobile ? "50%" : index % 2 === 0 ? "25%" : "60%",
            transform: isMobile ? "translateX(-50%)" : "none",
            top: `${5 + index * (isMobile ? 18 : 15)}%`,
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            opacity: triggerAnimation ? 1 : 0,
            transition: "opacity 1s ease",
            zIndex: 2,
          }}
        >
          <h3>Milestone {index + 1}</h3>
          <p>{text}</p>
        </Box>
      ))}
    </Box>
  );
}

export default Timeline;
