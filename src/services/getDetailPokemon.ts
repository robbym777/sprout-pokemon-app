import { pokemonColors } from "@/utils";
import { Pokemon } from "./interfaces";

interface RequestGetDetailPokemon {
  name: string;
}

const getDetailPokemon = async ({
  name,
}: RequestGetDetailPokemon): Promise<Pokemon | undefined> => {
  try {
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!resPokemon.ok) return undefined;
    const pokemon = await resPokemon.json();

    const resPokemonSpecies = await fetch(pokemon?.species?.url);
    if (!resPokemonSpecies.ok) return undefined;
    const pokemonSpecies = await resPokemonSpecies.json();

    return {
      name: pokemon?.name,
      sprites: pokemon?.sprites?.other?.showdown?.front_default,
      color: pokemonColors[pokemonSpecies?.color?.name ?? "white"],
    } as Pokemon;
  } catch (error) {
    return undefined;
  }
};

export default getDetailPokemon;
