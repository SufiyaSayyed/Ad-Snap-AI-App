import { useRef } from "react";
import BackgroundBlur from "../assets/background_blurr_2.png";
import innerImage from "../assets/inner_background.png";
import { ScrollParallax } from "react-just-parallax";
import Generating from "@/components/Generating";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const parallaxRef = useRef(null);
  return (
    <div className="pt-[3rem] container relative" ref={parallaxRef}>
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-15 lg:mb-[4rem]">
        <h1 className="mb-6">Your AI Art Playground</h1>
        <p className="body-1 text-2xl max-w-3xl mx-auto mb-6 text-border-2 lg:mb-8">
          From prompts to polished photos — generate, enhance, and edit your
          images with ease using Crezia
        </p>
        <button
          onClick={() => navigate("/playground")}
          className="font-grotesk bg-p-5 border border-border-2 text-n-1 rounded-full px-4 py-1 cursor-pointer hover:bg-p-7"
        >
          Open Playground
        </button>
      </div>
      <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
        <div className="aspect-[33/40] rounded-[2rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/550] border-2 border-border-3">
          <img
            src={BackgroundBlur}
            className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[35%]"
            width={1090}
            height={490}
            alt="ai"
          />

          <ScrollParallax isAbsolutelyPositioned>
            <p className="font-code text-border-3 text-3xl absolute left-0 right-0 mx-auto bottom-90 md:left-1/2 md:right-auto md:bottom-110 md:-translate-x-1/2 text-center">
              PROMPT
            </p>
          </ScrollParallax>

          <ScrollParallax isAbsolutelyPositioned>
            <img
              src={innerImage}
              width={300}
              height={200}
              className="absolute rounded-[2rem] border-2 border-border-3 left-0 right-0 mx-auto bottom-25 md:left-1/2 md:right-auto md:bottom-30  md:w-[25rem] md:h-[18rem] md:-translate-x-1/2"
            />
          </ScrollParallax>

          <ScrollParallax isAbsolutelyPositioned>
            <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
          </ScrollParallax>
        </div>
      </div>

      {/* <button
        className="
        relative px-10 py-4
        rounded-2xl
        text-white text-2xl font-bold tracking-widest
        bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-700
        border-2 border-blue-300
        shadow-[inset_0_6px_18px_2px_rgba(0,90,255,0.40)]
        before:content-[''] before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-br before:from-cyan-300/50 before:to-blue-800/0 before:pointer-events-none
        focus:outline-none
        "
        style={{
          boxShadow:
            "inset 0 0 16px 2px rgba(40,185,255,0.5), 0 2px 24px 1px rgba(16,114,240,0.25)", // extra inner & outer glow
        }}
      >
        GENERATE IMAGE
      </button> */}
    </div>
  );
};

export default Hero;
