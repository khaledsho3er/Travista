import React, { useEffect, useState } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  scrambleDurationPerLetter = 500, // ms each letter scrambles before settling
  scrambleInterval = 30, // ms between each scramble frame
  ...props
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let running = true;
    const startTimes = Array.from(
      { length: text.length },
      (_, i) => Date.now() + i * scrambleDurationPerLetter
    );
    const endTimes = startTimes.map((t) => t + scrambleDurationPerLetter);

    function scrambleFrame() {
      const now = Date.now();
      let output = "";
      let done = true;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          output += text[i];
        } else if (now >= endTimes[i]) {
          output += text[i];
        } else {
          output += randomChar();
          done = false;
        }
      }
      setDisplay(output);
      if (!done && running) {
        setTimeout(scrambleFrame, scrambleInterval);
      }
    }

    scrambleFrame();
    return () => {
      running = false;
    };
    // eslint-disable-next-line
  }, [text, scrambleDurationPerLetter, scrambleInterval]);

  return <span {...props}>{display}</span>;
}
