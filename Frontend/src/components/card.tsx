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
    <a
      href={`https://myanimelist.net/character/${id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`w-64 h-64 rounded-full shadow-lg border-4 ${
          mode === 1 ? "border-black" : "border-white"
        } overflow-hidden flex items-end justify-center text-black text-shadow: 1px 1px 2px white; text-center p-4 text-[1.2rem] font-extrabold transition-all ease-in-out duration-200`}
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
  );
};
export default Card;
