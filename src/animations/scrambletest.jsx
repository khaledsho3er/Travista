import React, { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  speed = 30,
  revealDelay = 0,
  ...props
}) {
  const [display, setDisplay] = useState("");
  const frame = useRef(0);

  useEffect(() => {
    let timeout;
    let running = true;

    function scramble() {
      let output = "";
      let complete = 0;
      for (let i = 0; i < text.length; i++) {
        if (frame.current > i + revealDelay) {
          output += text[i];
          complete++;
        } else if (text[i] === " " || text[i] === "\n") {
          output += text[i];
          complete++;
        } else {
          output += randomChar();
        }
      }
      setDisplay(output);

      if (complete < text.length && running) {
        frame.current += 1;
        timeout = setTimeout(scramble, speed);
      }
    }

    frame.current = 0;
    scramble();

    return () => {
      running = false;
      clearTimeout(timeout);
    };
  }, [text, speed, revealDelay]);

  return <span {...props}>{display}</span>;
}
