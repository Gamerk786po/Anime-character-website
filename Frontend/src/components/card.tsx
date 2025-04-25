interface CardProps {
  name: string;
  img: string;
  mode: number;
  id: number;
}
// Card component
const Card: React.FC<CardProps> = ({ name, img, mode, id }) => {
  return (
    // Main container for the card
    <div className="flex p-0 flex-col">
      <div className="flex flex-row items-start translate-y-10">
        <button className="h-auto w-auto rounded-xl transition-transform duration-300 ease-in-out md:hover:scale-125 hover:cursor-pointer">
          ❤️
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
          {/* Container for information */}
          <div className="bg-white bg-opacity-80 w-full px-2 py-1 text-center text-black text-[1rem] font-bold break-words">
            <p className="leading-tight">{name}</p>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Card;
