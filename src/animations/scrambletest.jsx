import React, { useEffect, useRef, useState } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  duration = 30000,
  revealDelay = 0,
  ...props
}) {
  const [display, setDisplay] = useState("");
  const index = useRef(0);

  useEffect(() => {
    let timeout;
    let running = true;
    const total = text.length;
    const speed = total > 0 ? duration / total : 30; // ms per letter

    function reveal() {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (i < index.current) {
          output += text[i];
        } else if (text[i] === " " || text[i] === "\n") {
          output += text[i];
        } else {
          output += randomChar();
        }
      }
      setDisplay(output);

      if (index.current <= text.length && running) {
        index.current += 1;
        timeout = setTimeout(reveal, speed);
      }
    }

    index.current = 0;
    reveal();

    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [text, duration, revealDelay]);

  return <span {...props}>{display}</span>;
}
