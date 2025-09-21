import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/hd-image": "Generative HD Images",
  "/gen-fill": "Generative fill",
  "/erase-element": "Erase Elements",
  "/replace-bg": "Replace Background",
};

const MainLayout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname];
  return (
    <div className="min-h-screen flex">
      {/* side  bar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-semibold border-b border-gray-700">
          AI Ad Snap
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link
            to="/hd-image"
            className={cn(
              "px-3 py-2 rounded-lg hover:bg-gray-700",
              location.pathname === "/hd-image" && "bg-gray-700"
            )}
          >
            Generative HD Image
          </Link>
          <Link
            to="/gen-fill"
            className={cn(
              "px-3 py-2 rounded-lg hover:bg-gray-700",
              location.pathname === "/gen-fill" && "bg-gray-700"
            )}
          >
            Generative Fill
          </Link>
          <Link
            to="/erase-element"
            className={cn(
              "px-3 py-2 rounded-lg hover:bg-gray-700",
              location.pathname === "/erase-element" && "bg-gray-700"
            )}
          >
            Erase Elements
          </Link>
          <Link
            to="/replace-bg"
            className={cn(
              "px-3 py-2 rounded-lg hover:bg-gray-700",
              location.pathname === "/gen-bg" && "bg-gray-700"
            )}
          >
            Replace Background
          </Link>
        </nav>
      </div>

      {/* mainContent and dynamic header */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 bg-white">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
