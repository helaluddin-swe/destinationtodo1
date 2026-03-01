import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div className=" top-0 m-0 px-4 py-6">
      <div className="flex justify-between gap-4 items-center font-bold">
        {" "}
        <h3
          className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse
"
        >
          {" "}
          DestinationTodo
        </h3>{" "}
        <button className="hidden md:flex border border-gray-300 rounded-md px-8 text-md bg-gray-500 hover:bg-gray-300 py-4">
          {" "}
          Login
        </button>
        <button
          className=""
          onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}{" "}
        </button>
      </div>
    </div>
  );
};

export default Header;
