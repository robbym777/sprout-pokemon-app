"use client";
import { getListPokemon, ListData } from "@/services";
import { useEffect, useState } from "react";
import { LoadMoreLoading, PokemonCardComponent } from "@/components";

const Page = () => {
  const [index, setIndex] = useState<number>(0);
  const [listPokemon, setListPokemon] = useState<ListData | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getListPokemon({ index })
        .then((data) => {
          const pokemons = {
            count: data?.count ?? 0,
            next: data?.next,
            previous: data?.previous,
            results: [
              ...(listPokemon?.results ?? []),
              ...(data?.results ?? []),
            ],
          };
          setListPokemon(pokemons as ListData);
        })
        .finally(() => setLoading(false));
    }
  }, [index]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <div
        className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-4
          p-4 mr-4 overflow-y-auto h-[calc(100vh-96px)]
        "
        onScroll={(e) => {
          if (listPokemon?.next) {
            handleScroll(e);
          }
        }}
      >
        {listPokemon?.results?.map((pokemon) => (
          <PokemonCardComponent key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
      {loading && (
        <div className="absolute bottom-0 w-full">
          <LoadMoreLoading />
        </div>
      )}
    </>
  );
};

export default Page;
