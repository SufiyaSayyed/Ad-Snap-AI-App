import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import Logo from "../assets/logo2.svg";

const MainLayout = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link
        to="/playground/hd-image"
        className={cn(
          "px-3 py-2 rounded-lg hover:bg-gray-700",
          location.pathname === "/playground/hd-image" && "bg-gray-700"
        )}
        onClick={() => setIsOpen(false)}
      >
        Generative HD Image
      </Link>
      <Link
        to="/playground/gen-fill"
        className={cn(
          "px-3 py-2 rounded-lg hover:bg-gray-700",
          location.pathname === "/playground/gen-fill" && "bg-gray-700"
        )}
        onClick={() => setIsOpen(false)}
      >
        Generative Fill
      </Link>
      <Link
        to="/playground/erase-element"
        className={cn(
          "px-3 py-2 rounded-lg hover:bg-gray-700",
          location.pathname === "/playground/erase-element" && "bg-gray-700"
        )}
        onClick={() => setIsOpen(false)}
      >
        Erase Elements
      </Link>
      <Link
        to="/playground/replace-bg"
        className={cn(
          "px-3 py-2 rounded-lg hover:bg-gray-700",
          location.pathname === "/playground/replace-bg" && "bg-gray-700"
        )}
        onClick={() => setIsOpen(false)}
      >
        Replace Background
      </Link>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (Desktop only) */}
      <div className="hidden md:flex w-64 bg-p-8 text-n-1 flex-col border-r border-p-4">
        <div className="py-3 text-xl font-semibold flex justify-center items-center border-b border-p-4">
          <a href="/" className="block">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                <img src="/logo_1.svg" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                ImagineAI
              </span>
            </div>
          </a>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <NavLinks />
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-p-8 text-white z-50 flex flex-col">
          <div className="flex justify-between items-center py-5.5 px-4 border-b border-gray-700">
            <a href="/" className="block">
              <img src={Logo} alt="logo" width={110} height={30} />
            </a>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-6 text-lg">
            <NavLinks />
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar only for mobile */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 border-b bg-p-7 border-p-4">
          <a href="/" className="block">
            <img src={Logo} alt="logo" width={110} height={32} />
          </a>
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-6 h-6 text-n-1" />
          </button>
        </div>

        <main className="flex-1 p-6 overflow-y-auto mt-18 xl:mt-0 lg:mt-0 md:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
