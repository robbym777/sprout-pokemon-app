import { ListData } from "./interfaces";

interface RequestGetListPokemon {
  index: number;
}

const getListPokemon = async ({
  index,
}: RequestGetListPokemon): Promise<ListData | undefined> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=60&offset=${index * 60}`);
    if (!response.ok) return undefined;
    const data = await response.json();

    return data as ListData;
  } catch (error) {
    return undefined;
  }
};

export default getListPokemon;
