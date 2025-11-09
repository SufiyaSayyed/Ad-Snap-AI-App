"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" }); // triggers in/out view

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={{
        width: isInView ? "clamp(10rem, 50vw, 10rem)" : 0, // animated target width
      }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut",
      }}
      className="
        h-1 
        bg-primary
        mb-6 rounded-full mx-auto
      "
    />
  );
};

export default AnimatedLine;
