import type { ToolsDesc } from "@/types";

export const toolsDesc: ToolsDesc[] = [
  {
    title: "Generate HD Images",
    description:
      "Turn text prompts into stunning high-definition visuals with adjustable AI-powered image generation.",
    logo: "/image-plus.svg",
    link: "/playground/hd-image",
  },
  {
    title: "Generative fill",
    description:
      "Draw a mask and describe new elements—AI blends them seamlessly into your image.",
    logo: "/brush.svg",
    link: "/playground/gen-fill",
  },
  {
    title: "Erase Elements",
    description:
      "Highlight unwanted areas, and AI intelligently removes them while preserving natural surroundings.",
    logo: "/eraser.svg",
    link: "/playground/erase-element",
  },
  {
    title: "Replace Background",
    description:
      "Upload a photo and describe a new background—AI replaces it flawlessly in seconds.",
    logo: "/images.svg",
    link: "/playground/replace-bg",
  },
];
