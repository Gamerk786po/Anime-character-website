import { useState } from "react";

interface CardProps {
  name: string;
  img: string;
  mode: number;
  id: number;
  isFavorite: boolean;
}

const Card: React.FC<CardProps> = ({ name, img, mode, id, isFavorite }) => {
  // heart hovering state managemnet
  const [heartHover, setHeartHover] = useState(false);

  // Favorited state management
  const [favorited, setFavorited] = useState(isFavorite);
  // function for putting data in mongo db favorites
  const putData = () => {
    setFavorited(true);
    fetch("http://localhost:4000/putAnime", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mal_id: id,
        name: name,
        url: `https://myanimelist.net/character/${id}`,
        image: img,
      }),
    }).catch((error) => {
      console.error("Failed to favorite:", error);
      setFavorited(false);
    });
  };
  // function for deleting data from mongo db favorites
  const delData = () => {
    setFavorited(false);
  }
  return (
    <div className="flex p-0 flex-col">
      <div className="flex flex-row items-start translate-y-10">
        <button
          className="h-auto w-auto rounded-xl transition-transform duration-300 ease-in-out md:hover:scale-125 hover:cursor-pointer"
          onMouseEnter={() => setHeartHover(true)}
          onMouseLeave={() => setHeartHover(false)}
          onClick={putData}
        >
          {heartHover ? (favorited ? "🤍" : "❤️") : favorited ? "❤️" : "🤍"}
        </button>
      </div>

      <a
        href={`https://myanimelist.net/character/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={`w-64 h-64 rounded-full shadow-lg border-4 ${
            mode === 1 ? "border-black" : "border-white"
          } overflow-hidden flex items-end justify-center text-black text-shadow: 1px 1px 2px white; text-center p-4 text-[1.2rem] font-extrabold transition-all ease-in-out duration-500 md:hover:w-70 md:hover:h-70`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-white bg-opacity-80 w-full px-2 py-1 text-center text-black text-[1rem] font-bold break-words">
            <p className="leading-tight">{name}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
