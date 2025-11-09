const NavBar = () => {
  return (
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
      <div className="flex items-center gap-8">
        <a href="/" className="md:block hidden">
          <span className="text-primary-foreground">Features</span>
        </a>
        <a href="/playground" className="block">
          <span className="text-primary-foreground">Create</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
