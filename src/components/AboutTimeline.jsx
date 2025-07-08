// import React, { useEffect, useRef, useState } from "react";
// import { Box, useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const milestones = [
//   "2004 - The company was officially founded and licensed as a Category (A) tourism company, laying the cornerstone for what would become a trusted name in the travel industry.",
//   "2009 - Relocated to our new multi-story headquarters in Heliopolis, Cairo — a significant step in scaling our operations and client services.",
//   "2010 – 2014 – Expanded our national footprint with new branches in Tanta, Fayoum, Alexandria, and El-Mahalla El-Kubra, bringing world-class travel services closer to clients across Egypt.",
//   "2015 – Travista Egypt joined the Travista Group, marking a strategic move that strengthened our organizational structure and global positioning.",
//   "2016 – Extended our international presence with offices and strategic partnerships in the United States, the United Arab Emirates, and Spain — enhancing our capacity to serve a global clientele.",
//   "2022 –Awarded the prestigious Luxury Travel Award, recognizing our excellence, innovation, and leadership in the global travel and tourism sector.",
//   "2025 –Celebrated a landmark achievement: over 400,000 clients served worldwide across aviation, visa facilitation, leisure travel, group tours, and corporate tourism",
// ];

// const cardPositions = [
//   { x: 721.87, y: 259.06 },
//   { x: 721.87, y: 605.45 },
//   { x: 1150.36, y: 447.39 },
//   { x: 1150.36, y: 731.74 },
//   { x: 721.87, y: 942.58 },
//   { x: 1150.36, y: 1107.68 },
//   { x: 721.87, y: 1341.93 },
// ];

// function Timeline() {
//   const containerRef = useRef();
//   const pathRef = useRef();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       ref={containerRef}
//       sx={{
//         position: "relative",
//         width: "100%",
//         minHeight: isMobile ? `${milestones.length * 300}px` : "1560px",
//         paddingTop: "50px",
//         paddingBottom: "150px",
//         backgroundImage: 'url("assets/About/background.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         overflow: "hidden",
//       }}
//     >
//       {/* SVG Path as background */}
//       <svg
//         width="1245"
//         height="1960"
//         viewBox="0 0 1245 1960"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "90%",
//           zIndex: 0,
//           pointerEvents: "none",
//         }}
//       >
//         <path
//           ref={pathRef}
//           d="M631.134 1C637.633 407.591 296.928 522.502 130.621 613.098C-31.1011 701.194 -22.4677 881.881 168.012 891.775C178.939 892.343 189.831 889.953 199.87 885.602L773.128 637.142L916.622 613.098C1303.41 547.981 1334.25 904.82 1010.11 995.095C1006.21 996.181 1002.1 996.939 998.071 997.372L352.644 1066.74C-51.8401 1107.25 -30.3408 1258.78 83.6548 1287.29L877.148 1407.9C881.126 1408.51 885.324 1408.8 889.347 1408.84C1216.42 1411.84 1161.39 1651.37 1047.62 1651.37L291.147 1667.37C-49.3401 1646.37 -51.3402 1933.93 184.651 1933.93H530C538.167 1933.93 241.348 1937.57 526.5 1933.93C241.348 1937.57 643.815 1933.17 259 1947L96.8627 1917.42"
//           stroke="#FED7D2"
//           strokeWidth="24"
//           fill="none"
//         />
//       </svg>

//       {/* Milestone Cards */}
//       {milestones.map((text, index) => {
//         const pos = cardPositions[index];
//         return (
//           <Box
//             key={index}
//             sx={{
//               position: "absolute",
//               width: isMobile ? "80%" : 320,
//               left: pos.x,
//               top: pos.y,
//               transform: "translate(-50%, -50%)",
//               padding: "24px 28px",
//               backgroundColor: "white",
//               borderRadius: 5,
//               boxShadow: 3,
//               textAlign: "left",
//               zIndex: 2,
//               opacity: 1,
//               transition: "opacity 1s ease",
//             }}
//           >
//             <h3
//               style={{
//                 fontWeight: "bold",
//                 lineHeight: 1.1,
//                 marginBottom: "20px",
//                 fontSize: "20px",
//                 fontFamily: "inter",
//               }}
//             >
//               {text.match(/^\d{4}(?:\s*[–-]\s*\d{4})?/)?.[0]}
//             </h3>
//             <p
//               style={{
//                 fontFamily: "inter",
//                 fontSize: "13px",
//                 letterSpacing: "0.5px",
//                 textAlign: "left",
//               }}
//             >
//               {text.replace(/^(\d{4}(?:\s*[–-]\s*\d{4})?\s*[-–—]?\s*)/, "")}
//             </p>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// }

// export default Timeline;
import React, { useRef } from "react";
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

const cardPositions = [
  { x: 721.87, y: 259.06 },
  { x: 721.87, y: 605.45 },
  { x: 1150.36, y: 447.39 },
  { x: 1150.36, y: 731.74 },
  { x: 721.87, y: 942.58 },
  { x: 1150.36, y: 1107.68 },
  { x: 721.87, y: 1341.93 },
];

function Timeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef();

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: isMobile ? `${milestones.length * 300}px` : "1700px",
        pt: 8,
        pb: 12,
        backgroundImage: 'url("assets/About/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {isMobile ? (
        <>
          {/* Mobile: Vertical Line */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "4px",
              height: "100%",
              transform: "translateX(-50%)",
              backgroundColor: "#FED7D2",
              zIndex: 1,
            }}
          />

          {/* Mobile: Stacked Cards */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              zIndex: 2,
            }}
          >
            {milestones.map((text, index) => (
              <Box
                key={index}
                sx={{
                  width: "80%",
                  maxWidth: "360px",
                  padding: "24px 28px",
                  backgroundColor: "white",
                  borderRadius: 5,
                  boxShadow: 3,
                  textAlign: "left",
                }}
              >
                <h3
                  style={{
                    fontWeight: "bold",
                    marginBottom: "16px",
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
                    lineHeight: 1.5,
                  }}
                >
                  {text.replace(/^(\d{4}(?:\s*[–-]\s*\d{4})?\s*[-–—]?\s*)/, "")}
                </p>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          {/* Desktop: Snake Path SVG */}
          <svg
            width="1245"
            height="1960"
            viewBox="0 0 1245 1960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "90%",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <path
              d="M631.134 1C637.633 407.591 296.928 522.502 130.621 613.098C-31.1011 701.194 -22.4677 881.881 168.012 891.775C178.939 892.343 189.831 889.953 199.87 885.602L773.128 637.142L916.622 613.098C1303.41 547.981 1334.25 904.82 1010.11 995.095C1006.21 996.181 1002.1 996.939 998.071 997.372L352.644 1066.74C-51.8401 1107.25 -30.3408 1258.78 83.6548 1287.29L877.148 1407.9C881.126 1408.51 885.324 1408.8 889.347 1408.84C1216.42 1411.84 1161.39 1651.37 1047.62 1651.37L291.147 1667.37C-49.3401 1646.37 -51.3402 1933.93 184.651 1933.93H530C538.167 1933.93 241.348 1937.57 526.5 1933.93C241.348 1937.57 643.815 1933.17 259 1947L96.8627 1917.42"
              stroke="#FED7D2"
              strokeWidth="24"
              fill="none"
            />
          </svg>

          {/* Desktop: Positioned Cards */}
          {milestones.map((text, index) => {
            const pos = cardPositions[index];
            return (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  width: 320,
                  left: pos.x,
                  top: pos.y,
                  transform: "translate(-50%, -50%)",
                  padding: "24px 28px",
                  backgroundColor: "white",
                  borderRadius: 5,
                  boxShadow: 3,
                  textAlign: "left",
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    fontFamily: "inter",
                    marginBottom: "16px",
                  }}
                >
                  {text.match(/^\d{4}(?:\s*[–-]\s*\d{4})?/)?.[0]}
                </h3>
                <p
                  style={{
                    fontFamily: "inter",
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                    lineHeight: 1.5,
                  }}
                >
                  {text.replace(/^(\d{4}(?:\s*[–-]\s*\d{4})?\s*[-–—]?\s*)/, "")}
                </p>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
}

export default Timeline;
