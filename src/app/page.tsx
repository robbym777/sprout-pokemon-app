"use client";
import { getListPokemon, Pokemon } from "@/services";
import { useEffect, useState } from "react";

const Page = () => {
  const [pagination, setPagination] = useState(1);
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([]);
  const [isHovered, setIsHovered] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const pokemons = await getListPokemon({ page: pagination });
      setListPokemon((prev) => [...prev, ...(pokemons ?? [])]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <img src="/pokemon.svg" alt="pokemon-logo" className="w-[224px] sm:w-[320px] lg:w-[416px] 2xl:w-[512px] h-auto mx-auto my-2" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-4 p-4">
      {listPokemon.map((pokemon) => (
        <button
          key={pokemon.name}
          style={{
            background: `linear-gradient(180deg, ${pokemon.color}, #FFCD0D)`,
            transition: "background-position 0.25s linear",
            backgroundSize: "100% 250%",
            backgroundPosition: pokemon.name === isHovered ? "0% 100%" : "0% 0%",
          }}
          className="
            flex flex-col items-center justify-between p-4 rounded-lg aspect-[3/4] w-full h-full
            shadow-xl
            hover:scale-105 transition-transform duration-1000
            hover:border-2 border-[#4062AB] hover:border-opacity-50
          "
          onMouseEnter={() => setIsHovered(pokemon.name)}
          onMouseLeave={() => setIsHovered(undefined)}
        >
          <p className={`font-semibold text-[#FFCD0D] [text-shadow:_-1px_-1px_2_#4062AB,1px_1px_2_#4062AB] text-[24px]`}>
            {pokemon.name}
          </p>
          <img alt="sprites" src={pokemon.sprites} className="w-auto h-[60%]"/>
        </button>
      ))}
    </div>
    </div>
  );
};

export default Page;
