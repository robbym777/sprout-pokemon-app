import { pokemonColors } from "@/utils";
import { DetailPokemon } from "./interfaces";

interface RequestGetDetailPokemon {
  name: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const getMoreDetailPokemon = async ({
  name,
}: RequestGetDetailPokemon): Promise<DetailPokemon | undefined> => {
  const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!resPokemon.ok) return undefined;
  const pokemon = await resPokemon.json();

  const resPokemonSpecies = await fetch(pokemon?.species?.url);
  if (!resPokemonSpecies.ok) return undefined;
  const pokemonSpecies = await resPokemonSpecies.json();

  const types = pokemon?.types?.map((t: any) => t.type.name);
  const weaknesses = new Set();
  for (const type of types) {
    const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeRes.json();

    typeData?.damage_relations.double_damage_from?.forEach((weak: any) => {
      weaknesses.add(weak.name);
    });
  }

  const evolutionRes = await fetch(pokemonSpecies?.evolution_chain?.url);
  const evolutionData = await evolutionRes.json();
  const evolutions: string[] = [];

  let chain = evolutionData.chain;
  while (chain) {
    const evolutionVerRes = await fetch(chain?.species?.url);
    if (evolutionVerRes.ok) {
      const evolutionVerData = await evolutionVerRes.json();
      evolutionVerData?.varieties?.map((v: any) => {
        evolutions.push(v?.pokemon?.name);
      });
    }
    chain = chain.evolves_to.length ? chain.evolves_to[0] : null;
  }

  return {
    name: pokemon?.name,
    id: pokemon?.id,
    sprites: pokemon?.sprites?.other?.showdown?.front_default,
    color: pokemonColors[pokemonSpecies?.color?.name ?? "white"],
    habitat: pokemonSpecies?.habitat?.name,
    abilities: pokemon?.abilities,
    height: pokemon?.height,
    weight: pokemon?.weight,
    types: (pokemon?.types ?? []).map((v: any) => v?.type?.name ?? ""),
    stats: pokemon?.stats,
    shape: pokemonSpecies?.shape?.name,
    eggGroups: (pokemonSpecies?.egg_groups ?? []).map(
      (v: any) => v?.name ?? ""
    ),
    weaknesses: Array.from(weaknesses),
    species: pokemonSpecies?.genera?.find((g: any) => g.language.name === "en")
      ?.genus,
    evolution: evolutions,
  } as DetailPokemon;
};

export default getMoreDetailPokemon;
