import { AnimatePresence, motion } from "framer-motion";

function RollingNumber({ value }) {
  return (
    <span
      style={{ display: "inline-block", minWidth: "1ch", position: "relative" }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={value}
          initial={{
            y: 20,
            opacity: 0,
            position: "absolute",
            left: 0,
            right: 0,
          }}
          animate={{ y: 0, opacity: 1, position: "static" }}
          exit={{ y: -20, opacity: 0, position: "absolute", left: 0, right: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "inline-block" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default RollingNumber;
