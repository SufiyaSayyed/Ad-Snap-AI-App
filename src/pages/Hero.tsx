import LightRays from "@/components/LightRays";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }} // Initial state
      animate={{ opacity: 1, scale: 1 }} // Animated state
      transition={{ duration: 0.5 }} // Animation duration
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🌌 Background Layer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} // Initial state
        animate={{ opacity: 1, scale: 1 }} // Animated state
        transition={{ duration: 0.5 }} // Animation duration
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Your AI Art Playground
        </h1>

        <p className="text-base md:text-lg mb-6 max-w-xl">
          From prompts to polished photos — generate, enhance, and edit your
          images with ease using <span className="font-semibold">ImageAI</span>.
        </p>

        <Button
          onClick={() => navigate("/playground")}
          className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Get Started
        </Button>

        {/* <DisperseImages /> */}
      </div>
    </motion.div>
  );
};

export default Hero;
