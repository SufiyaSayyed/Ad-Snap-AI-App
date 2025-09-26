import Logo from "../assets/logo2.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-p-8/90 backdrop-blur-sm border-b border-p-4">
      <div className="flex items-center justify-between r px-5 lg:px-7.5 xl:px-10 md:py-2 py-4 lg:py-2">
        <a href="/" className="block w-[12rem] xl:m-2">
          <img src={Logo} alt="logo" width={140} height={40} />
        </a>
        <button
          onClick={() => navigate("/playground")}
          className="font-grotesk bg-p-5 border border-border-2 text-n-1 rounded-full px-4 py-1 cursor-pointer hover:bg-p-7"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NavBar;
