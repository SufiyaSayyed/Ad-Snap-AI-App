import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ImageCarousel: React.FC = () => {
  const [positionIndexes, setPositionIndexes] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  const images: string[] = [
    "images/image_1.png",
    "images/image_2.png",
    "images/image_3.png",
    "images/image_4.png",
    "images/image_5.png",
  ];

  const positions: string[] = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: "-50%", scale: 0.75, zIndex: 3, opacity: 0.8 },
    left: { x: "-90%", scale: 0.6, zIndex: 2, opacity: 0.6 },
    right: { x: "90%", scale: 0.6, zIndex: 2, opacity: 0.6 },
    right1: { x: "50%", scale: 0.75, zIndex: 3, opacity: 0.8 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndexes((prevIndexes) =>
        prevIndexes.map((prevIndex) => (prevIndex + 1) % images.length)
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative flex items-center justify-center w-full h-[300px] md:h-[400px] overflow-visible">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`slide-${index}`}
          className="absolute rounded-xl object-contain"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            width: "100%",
            maxWidth: "380px",
            height: "auto",
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
