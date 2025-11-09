import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedLine from "@/components/AnimatedLine";
import SpotlightCard from "@/components/SpotlightCard";
import { toolsDesc } from "@/data";

const Tools = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.6, 1, 1, 0.9]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.98, 1, 1, 0.98]
  );
  return (
    <section
      id="tools"
      className="min-h-screen bg-background py-30 md:py-20 px-10 md:px-8 lg:px-12"
    >
      <motion.div
        ref={containerRef}
        style={{ opacity, scale }}
        className="max-w-4xl mx-auto"
        layout
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            AI Tools
          </h1>
          <AnimatedLine />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore AI tools available in ImagineAI to create images with
            endless possibilites!
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {toolsDesc.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              key={index}
            >
              <SpotlightCard
                className="custom-spotlight-card p-6 flex flex-col items-center text-center"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="w-12 h-12 mb-3 rounded-full bg-cyan-500/10 flex items-center justify-center">
                  <img src={item.logo} alt="" className="w-6 h-6 invert" />
                </div>
                <h1 className="text-lg font-bold mb-2">{item.title}</h1>
                <p className="font-grotesk">{item.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tools;
