import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const milestones = [
  "2004 - The company was officially founded and licensed as a Category (A) tourism company, laying the cornerstone for what would become a trusted name in the travel industry.",
  "2009 - Relocated to our new multi-story headquarters in Heliopolis, Cairo — a significant step in scaling our operations and client services.",
  "2010 – 2014 – Expanded our national footprint with new branches in Tanta, Fayoum, Alexandria, and El-Mahalla El-Kubra, bringing world-class travel services closer to clients across Egypt.",
  "2015 – Travista Egypt joined the Travista Group, marking a strategic move that strengthened our organizational structure and global positioning.",
  "2016 – Extended our international presence with offices and strategic partnerships in the United States, the United Arab Emirates, and Spain — enhancing our capacity to serve a global clientele.",
  "2022 –Awarded the prestigious Luxury Travel Award, recognizing our excellence, innovation, and leadership in the global travel and tourism sector.",
  "2025 –Celebrated a landmark achievement: over 400,000 clients served worldwide across aviation, visa facilitation, leisure travel, group tours, and corporate tourism",
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
    // Start with the top center of the container
    const startX = containerRect.width / 2;
    const startY = 40; // some padding from the top
    const newPoints = [
      { x: startX, y: startY },
      ...cardRefs.current
        .map((ref) => {
          if (!ref) return null;
          const cardRect = ref.getBoundingClientRect();
          return {
            x: cardRect.left + cardRect.width / 2 - containerRect.left,
            y: cardRect.top + cardRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean),
    ];
    setPoints(newPoints);
  };

  const generatePath = () => {
    if (points.length < 2) return "";
    // Define left and right x positions for the snake
    const leftX = points[0].x - 120; // adjust as needed
    const rightX = points[0].x + 120; // adjust as needed
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Alternate between left and right
      const isEven = i % 2 === 0;
      const targetX = isEven ? leftX : rightX;
      // Go horizontal to the side, then vertical to the next point
      d += ` Q ${targetX},${points[i - 1].y} ${targetX},${
        (points[i - 1].y + points[i].y) / 2
      }`;
      d += ` Q ${targetX},${points[i].y} ${points[i].x},${points[i].y}`;
    }
    return d;
  };
  const generateSnakePath = () => {
    if (points.length < 2) return "";
    const amplitude = 120; // How far the snake path deviates left/right
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Alternate left/right for control point, but skip for the first segment (straight down)
      const direction = i % 2 === 0 ? 1 : -1;
      const controlX = points[i].x + amplitude * direction;
      const controlY = (points[i - 1].y + points[i].y) / 2;
      d += ` Q ${controlX},${controlY} ${points[i].x},${points[i].y}`;
    }
    return d;
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: isMobile ? `${milestones.length * 300}px` : "1450px",
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
          d={generateSnakePath()}
          fill="none"
          stroke="#f7a9a8" // Match your chosen aesthetic
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
            width: isMobile ? "80%" : 320,
            left: "50%",
            transform: "translateX(-50%)",
            top: `${5 + index * (isMobile ? 14 : 12)}%`,
            padding: "24px 28px",
            backgroundColor: "white",
            borderRadius: 5,
            boxShadow: 3,
            textAlign: "left",
            zIndex: 2,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              lineHeight: 1.1,
              mb: 1.5,
              marginBottom: "20px",
              fontSize: "20px",
              fontFamily: "inter",
            }}
          >
            {text.match(/^\d{4}(?:\s*[–-]\s*\d{4})?/)?.[0]}
          </h3>
          <p
            style={{
              fontFamily: "inter",
              fontSize: "13px",
              letterSpacing: "0.5px",
              textAlign: "left",
            }}
          >
            {text.replace(/^(\d{4}(?:\s*[–-]\s*\d{4})?\s*[-–—]?\s*)/, "")}
          </p>
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
