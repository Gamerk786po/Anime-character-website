import { useState, useEffect } from "react";
import NavBar from "./components/nav-bar";
import Body from "./components/body";

function App() {
  // State management for searching
  const [searchItem, setSearchItem] = useState("");

  // State management for theme of website
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("theme-mode");
    return storedMode !== null ? Number(storedMode) : 1;
  });
  // Function for toggling between modes
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 1 ? 0 : 1));
  };
  // Update localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem("theme-mode", mode.toString());
  }, [mode]);

  // Statemanagement for favorites
  const [showFavorite, setShowFavorite] = useState(false);

  const toggleShowFavorite = () => setShowFavorite((prev) => !prev);

  return (
    // Main container for everything
    <div
      className={`h-full 2xl:h-screen ${
        mode === 1 ? "bg-white text-black" : "bg-gray-800 text-white"
      } transition-all delay-150 duration-300 ease-in-out`}
    >
      <NavBar
        mode={mode}
        setMode={toggleMode}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        showFavorite={showFavorite}
        setShowFavorite={toggleShowFavorite}
      />
      <Body
        mode={mode}
        searchItem={searchItem}
        showFavorite={showFavorite}
        setShowFavorite={toggleShowFavorite}
      ></Body>
    </div>
  );
}

export default App;
