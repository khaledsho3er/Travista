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

const Timeline = () => {
  const containerRef = useRef();
  const cardRefs = useRef([]);
  const [points, setPoints] = useState([]);
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const lineDuration = 4; // seconds
  const animationOffset = 0.3; // card delay spacing in seconds

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    const node = containerRef.current;
    if (node) observer.observe(node);
    return () => node && observer.unobserve(node);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => updatePoints(), 100);
    return () => clearTimeout(timeout);
  }, [visible]);

  useEffect(() => {
    const handleResize = () => updatePoints();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updatePoints = () => {
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

  const generateSnakePath = () => {
    if (points.length < 2) return "";
    const centerX = points[0].x;
    const amplitude = 140;
    let d = `M ${centerX},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const direction = i % 2 === 0 ? -1 : 1;
      const controlX = centerX + direction * amplitude;
      const controlY = (points[i - 1].y + points[i].y) / 2;
      d += ` Q ${controlX},${controlY} ${centerX},${points[i].y}`;
    }
    return d;
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: isMobile ? `${milestones.length * 300}px` : "1800px",
        pt: 10,
        pb: 20,
        backgroundImage: 'url("/assets/About/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Snake Path Line */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <path
          d={generateSnakePath()}
          fill="none"
          stroke="#f7a9a8"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            strokeDasharray: 10000,
            strokeDashoffset: 10000,
            animation: visible
              ? `drawLine ${lineDuration}s ease forwards`
              : "none",
          }}
        />
      </svg>

      {/* Milestones */}
      {milestones.map((text, index) => {
        const year = text.match(/^\d{4}(?:\s*[–-]\s*\d{4})?/)?.[0];
        const content = text.replace(
          /^(\d{4}(?:\s*[–-]\s*\d{4})?\s*[-–—]?\s*)/,
          ""
        );
        const delay = animationOffset * index;

        return (
          <Box
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            sx={{
              position: "absolute",
              width: isMobile ? "80%" : "250px",
              left: isMobile ? "50%" : index % 2 === 0 ? "18%" : "58%",
              transform: isMobile ? "translateX(-50%)" : "none",
              top: `${100 + index * (isMobile ? 280 : 220)}px`,
              p: 2,
              backgroundColor: "white",
              borderRadius: 3,
              boxShadow: 3,
              zIndex: 2,
              opacity: 0,
              animation: visible
                ? `fadeInUp 0.8s ease ${delay + 1}s forwards`
                : "none",
            }}
          >
            <h3
              style={{ fontWeight: "bold", fontSize: "18px", marginBottom: 10 }}
            >
              {year}
            </h3>
            <p style={{ fontSize: "13px", lineHeight: 1.5 }}>{content}</p>
          </Box>
        );
      })}

      {/* Animations */}
      <style>
        {`
          @keyframes drawLine {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0px);
              opacity: 1;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Timeline;
