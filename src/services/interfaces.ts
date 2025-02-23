export interface Pokemon {
  name: string;
  sprites: string;
  color: string;
}

export interface ListData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface DetailPokemon {
  name: string;
  id: number;
  sprites: string;
  color: string;
  height: number;
  weight: number;
  habitat: string;
  types: string[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  eggGroups: string[];
  shape: string;
  weaknesses: string[];
  species: string;
  evolution: string[];
}
