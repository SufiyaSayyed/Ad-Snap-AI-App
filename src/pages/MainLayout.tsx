import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Image, Eraser, Wand2, Replace } from "lucide-react";
import Dock from "@/components/Dock";

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dockItems = [
    {
      icon: <Image size={22} />,
      label: "HD Image",
      onClick: () => navigate("/playground/hd-image"),
    },
    {
      icon: <Wand2 size={22} />,
      label: "Gen Fill",
      onClick: () => navigate("/playground/gen-fill"),
    },
    {
      icon: <Eraser size={22} />,
      label: "Erase",
      onClick: () => navigate("/playground/erase-element"),
    },
    {
      icon: <Replace size={22} />,
      label: "Replace BG",
      onClick: () => navigate("/playground/replace-bg"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col text-n-1 relative">
      {/* ===== Top Header ===== */}
      <header className="flex justify-between items-center p-4 border-b border-muted-foreground-60 bg-background-80 backdrop-blur-lg fixed top-0 left-0 right-0 z-40">
        <a href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <img src="/logo_1.svg" alt="ImagineAI logo" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              ImagineAI
            </span>
          </div>
        </a>
      </header>

      {/* ===== Dock Navigation (bottom) ===== */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Dock
          items={dockItems.map((item) => ({
            ...item,
            icon: (
              <div
                className={`transition-all ${
                  location.pathname.includes(
                    item.label.toLowerCase().replace(" ", "-")
                  )
                    ? "text-primary scale-110"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {item.icon}
              </div>
            ),
          }))}
          panelHeight={isMobile ? 64 : 68}
          baseItemSize={isMobile ? 44 : 50}
          magnification={isMobile ? 60 : 70}
        />
      </div>

      {/* ===== Main Content ===== */}
      <main
        className={`
          flex-1 overflow-y-auto px-6
          pt-[calc(4rem+1.5rem)]  /* header height + spacing */
          pb-[calc(4rem+1.5rem)]  /* dock height + spacing */
          flex items-center justify-center
        `}
      >
        <div className="w-full max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
