import { ListData } from "./interfaces";

const getListAllPokemon = async (): Promise<string[] | undefined> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0");
    if (!response.ok) return undefined;
    const data = await response.json();

    const pokemons = data as ListData;
    return pokemons.results?.map((pokemon) => pokemon.name);
  } catch (error) {
    return undefined;
  }
};

export default getListAllPokemon;
