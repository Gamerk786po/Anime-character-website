import React from "react";

// Nav-bar props
interface NavProps {
  setMode: () => void;
  mode: number;
  searchItem: string;
  setSearchItem: (value: string) => void;
  isFavorite: boolean;
  setIsFavorite: () => void;
}
// Nav-bar-component
const NavBar: React.FC<NavProps> = ({
  setMode,
  mode,
  searchItem,
  setSearchItem,
  isFavorite,
  setIsFavorite,
}) => {
  return (
    // container for nav bar
    <div
      className={`max-w-full h-auto flex flex-col items-center md:flex-row gap-5 justify-evenly px-[2rem] ${
        mode === 1 ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      } transition-all delay-150 duration-300 ease-in-out`}
    >
      {/* Logo */}
      <img
        src="/assets/logo.png"
        alt="This is the logo"
        className="h-[10rem]"
      ></img>
      {/* Search bar */}
      <input
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search for the characters"
        className={`ring-1 rounded-md p-1 ${
          mode === 1
            ? "placeholder-white text-white"
            : "placeholder-black text-black"
        } transition-all delay-150 duration-300 ease-in-out`}
      ></input>
      {/* Likes character */}
      <button
        aria-label="Favorites"
        className="h-auto w-auto py-2 px-4 rounded-2xl hover:cursor-pointer border mb-4 md:mb-0 md:hover:text-xl transition-all duration-400 ease-in-out"
        onClick={setIsFavorite}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      {/* Dark-light switch */}
      <button
        type="button"
        aria-label="Toggle dark/light mode"
        className="h-auto w-auto py-2 px-4 rounded-2xl hover:cursor-pointer border mb-4 md:mb-0 md:hover:text-xl transition-all duration-400 ease-in-out"
        onClick={setMode}
      >
        {mode === 1 ? "🌙" : "🌞"}
      </button>
    </div>
  );
};
export default NavBar;
