import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  // Smooth scroll to section if it exists
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Smooth route transition
  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();

    // Optional: Add a short fade-out animation
    const body = document.body;
    body.classList.add("fade-out");
    setTimeout(() => {
      navigate(path);
      body.classList.remove("fade-out");
    }, 300);
  };

  return (
    <>
      <nav
        className="
          fixed top-4 left-1/2 -translate-x-1/2
          z-50 flex items-center justify-between
          backdrop-blur-xl bg-secondary/80
          border-muted-foreground/30 border
          rounded-full shadow-lg
          px-6 py-3 md:px-8 mt-4 md:mt-0 md:py-3
          w-[90%] max-w-5xl 
        "
      >
        <a href="/" onClick={(e) => handleNavigate(e, "/")} className="block">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <img src="/logo_1.svg" alt="ImagineAI logo" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ImagineAI
            </span>
          </div>
        </a>

        <div className="flex items-center gap-8">
          {/* Smooth scroll */}
          <a
            href="#tools"
            className="md:block hidden cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, "#tools")}
          >
            <span className="text-primary-foreground">Tools</span>
          </a>

          {/* Smooth route */}
          <a
            href="/playground"
            className="block cursor-pointer"
            onClick={(e) => handleNavigate(e, "/playground")}
          >
            <span className="text-primary-foreground">Create</span>
          </a>
        </div>
      </nav>

      {/* Optional transition animation wrapper */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </>
  );
};

export default NavBar;
