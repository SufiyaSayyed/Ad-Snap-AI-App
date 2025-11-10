import LightRays from "@/components/LightRays";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageCarousel from "@/components/ImageCarousel";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* 🌌 Background Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-0"
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#73B6F9"
          raysSpeed={0.5}
          lightSpread={0.5}
          rayLength={5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0.05}
          className="custom-rays"
          saturation={1}
          fadeDistance={0.8}
        />
      </motion.div>

      {/* 🌟 Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-10 gap-6 pt-10 md:pt-40">
        {/* Heading */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Your AI Art Playground
          </h1>

          <p className="text-base md:text-lg mb-6 max-w-xl mx-auto">
            From prompts to polished photos — generate, enhance, and edit your
            images with ease using{" "}
            <span className="font-semibold">ImageAI</span>.
          </p>
        </div>

        {/* Carousel Above Button */}
        <div className="w-full flex justify-center mb-6">
          <div className="w-[80%] md:w-[60%]">
            <ImageCarousel />
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={() => navigate("/playground")}
          className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

export default Hero;
