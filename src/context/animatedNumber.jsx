import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ value }) {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, Math.round);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.5 });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
}

export default AnimatedNumber;
