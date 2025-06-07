import { useEffect, useState } from "react";
import Card from "./card";
import ResetButton from "./rest-button";

// Props for body.tsx
interface BodyProps {
  mode: number;
  searchItem: string;
  showFavorite: boolean;
}

// Define the type for character
interface Character {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}
// define favorite character from db
interface FavoriteCharacterFromDB {
  mal_id: number;
  name: string;
  image: string;
}

const Body: React.FC<BodyProps> = ({ mode, searchItem, showFavorite }) => {
  // State management
  const [resetState, setResetState] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  // statemanagement for isFavorite
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  // Function for randomization
  const randomArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetching random characters
  const getData = async () => {
    try {
      // Random page number
      const page = Math.floor(Math.random() * 1500) + 1;
      const res = await fetch(
        `https://api.jikan.moe/v4/characters?limit=25&page=${page}&order_by=favorites&sort=desc`
      );
      const json: { data: Character[] } = await res.json();
      const randomCharacters = randomArray(json.data);
      setCharacters(randomCharacters.slice(0, 20));
    } catch (error) {
      console.log(`${error}`);
    }
  };

  // Fetching searched characters
  const getSearchedData = async () => {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/characters?q=${searchItem}&limit=15&order_by=favorites&sort=desc`
      );
      const json: { data: Character[] } = await res.json();
      const characters = json.data;
      setCharacters(characters.slice(0, 15));
    } catch (error) {
      console.log(`${error}`);
    }
  };

  // Fetching data from mongo db for favorites
  const getFavoritesData = async () => {
    try {
      const res = await fetch("http://localhost:4000/getAnime");
      const json = await res.json();
      // Mapping MongoDB format to Character[] format
      const formattedData = json.map((item: FavoriteCharacterFromDB) => ({
        mal_id: item.mal_id,
        name: item.name,
        images: {
          jpg: {
            image_url: item.image,
          },
        },
      }));
      setCharacters(formattedData);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  // Function for extracting mal_ids of mongo data
  const extractIds = async () => {
    try {
      // Fetching data from the server
      const data = await fetch("http://localhost:4000/getAnime");
      // Check if the response is OK
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      // Extracting mal_ids
      const ids = (json as FavoriteCharacterFromDB[]).map(item => item.mal_id);
      // Making a Set to remove duplicates
      const idSet = new Set<number>(ids);
      setFavoriteIds(idSet);
    } catch (error) {
      // Handling any errors that occur during the fetch or processing
      console.error("Error while extracting mal_ids:", error);
    }
  };
  // UseEffect for fetching data
  
  useEffect(() => {
    if (showFavorite === true) {
      getFavoritesData();
    } else {
      if (searchItem === "") {
        getData();
      } else {
        getSearchedData();
      }
    }
    extractIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetState, searchItem, showFavorite]);

  // Return
  return (
    <div>
      {/* Reset button */}
      <div className="flex justify-center md:justify-end w-full p-7">
        <ResetButton setResetState={() => setResetState((prev) => !prev)} />
      </div>

      {/* Character Cards */}
      <div className="p-4 flex flex-wrap gap-4 mt-[2rem] mx-2 justify-evenly">
        {characters.map((char) => (
          <Card
            key={char.mal_id}
            name={char.name}
            img={char.images.jpg.image_url}
            mode={mode}
            id={char.mal_id}
            isFavorite={favoriteIds.has(char.mal_id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
