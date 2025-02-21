import getDetailPokemon from "./getDetailPokemon";
import { Pokemon } from "./interfaces";

interface RequestGetListPokemon {
  page: number;
}

const getListPokemon = async ({
  page,
}: RequestGetListPokemon): Promise<Pokemon[] | undefined> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(page - 1) * 10}`
    );
    if (!response.ok) return undefined;
    const data = await response.json();

    const listPokemon: Pokemon[] = [];
    const pokemons: Pokemon[] = data?.results ?? [];
    for (const pokemon of pokemons) {
      const detail = await getDetailPokemon({ name: pokemon.name });
      if (detail) listPokemon.push(detail);
    }

    return listPokemon?.length ? listPokemon : undefined;
  } catch (error) {
    return undefined;
  }
};

export default getListPokemon;
