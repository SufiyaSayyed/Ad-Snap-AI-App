import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const images = [
  "images/image_1.png",
  "images/image_2.png",
  "images/image_3.png",
  "images/image_4.png",
  "images/image_5.png",
];

const positions = [
  { x: -250, y: -140 },
  { x: 0, y: -250 },
  { x: -250, y: 140 },
  { x: 250, y: -140 },
  { x: 250, y: 140 },
];

const centralImage = "images/image_6.png";

const DisperseImages: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // ⚡ Must create each transform separately at the top level
  const x0 = useTransform(scrollYProgress, [0, 0.5], [0, positions[0].x]);
  const y0 = useTransform(scrollYProgress, [0, 0.5], [0, positions[0].y]);
  const scale0 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const x1 = useTransform(scrollYProgress, [0, 0.5], [0, positions[1].x]);
  const y1 = useTransform(scrollYProgress, [0, 0.5], [0, positions[1].y]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const x2 = useTransform(scrollYProgress, [0, 0.5], [0, positions[2].x]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [0, positions[2].y]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const x3 = useTransform(scrollYProgress, [0, 0.5], [0, positions[3].x]);
  const y3 = useTransform(scrollYProgress, [0, 0.5], [0, positions[3].y]);
  const scale3 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const x4 = useTransform(scrollYProgress, [0, 0.5], [0, positions[4].x]);
  const y4 = useTransform(scrollYProgress, [0, 0.5], [0, positions[4].y]);
  const scale4 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const xTransforms = [x0, x1, x2, x3, x4];
  const yTransforms = [y0, y1, y2, y3, y4];
  const scaleTransforms = [scale0, scale1, scale2, scale3, scale4];

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex justify-center items-center overflow-hidden"
    >
      {/* Central Image */}
      <motion.img
        src={centralImage}
        className="absolute w-64 h-64 object-cover rounded-lg shadow-xl z-10"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.3], [0.8, 1]),
        }}
      />

      {/* Surrounding Images */}
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          className="absolute w-48 h-48 object-cover rounded-lg shadow-lg"
          style={{
            x: xTransforms[i],
            y: yTransforms[i],
            scale: scaleTransforms[i],
          }}
        />
      ))}
    </div>
  );
};

export default DisperseImages;
