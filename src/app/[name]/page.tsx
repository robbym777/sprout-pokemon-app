import { PokemonCardComponent, ProgressBarComponent } from "@/components";
import { getMoreDetailPokemon } from "@/services";
import {
  capitalize,
  heightFormatter,
  idFormatter,
  weightFormatter,
} from "@/utils";

type Props = {
  params: Promise<{ name: string }>;
};

const Page = async ({ params }: Props) => {
  const name = (await params).name;
  const pokemon = await getMoreDetailPokemon({ name });

  return (
    <div className="mr-4 overflow-y-auto h-[calc(100vh-12vw)] sm:h-[calc(100vh-96px)]">
      <div className="flex flex-row gap-4 items-center justify-center">
        <div
          className="
        text-primary [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB] text-center
          text-[9vw] sm:text-[60px] md:text-[72px] lg:text-[84px] 2xl:text-[96px]
        "
        >
          {capitalize(pokemon?.name)}
        </div>
        <p className="text-secondary text-xl sm:text-3xl lg:text-5xl font-bold">
          {idFormatter(pokemon?.id)}
        </p>
      </div>

      <div
        className="
        flex flex-col items-center
      "
      >
        <img
          alt="sprites"
          src={pokemon?.sprites}
          className="w-[107px] sm:w-[160px] lg:w-[208px] 2xl:w-[256px] h-auto"
        />

        <div className={`flex flex-col justify-between p-4 z-10 gap-4`}>
          <div className="relative h-full w-full rounded-lg items-center justify-center">
            <div
              className="absolute w-full h-full rounded-lg -z-10"
              style={{ backgroundColor: pokemon?.color, opacity: "0.5" }}
            />
            <div className="flex flex-col p-4 gap-2 lg:gap-4 overflow-auto h-full">
              <div>
                <p
                  className="
                    text-primary [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB] 
                    text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4
                  "
                >
                  About
                </p>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                  {[
                    {
                      label: "Species",
                      value: capitalize(pokemon?.species),
                    },
                    {
                      label: "Habitat",
                      value: capitalize(pokemon?.habitat),
                    },
                    {
                      label: "Height",
                      value: `${heightFormatter(pokemon?.height)}`,
                    },
                    {
                      label: "Weight",
                      value: weightFormatter(pokemon?.weight),
                    },
                    {
                      label: "Types",
                      value: pokemon?.types
                        ?.map((name) => capitalize(name))
                        .join(", "),
                    },
                    {
                      label: "Egg Groups",
                      value: pokemon?.eggGroups
                        ?.map((name) => capitalize(name))
                        .join(", "),
                    },
                    {
                      label: "Shape",
                      value: capitalize(pokemon?.shape),
                    },
                    {
                      label: "Abilities",
                      value: pokemon?.abilities
                        ?.map((ability) => {
                          return `${capitalize(ability.ability.name)}${
                            ability.is_hidden ? " (Hidden)" : ""
                          }`;
                        })
                        .join(", "),
                    },
                    {
                      label: "Weaknesses",
                      value: pokemon?.weaknesses
                        ?.map((name) => capitalize(name))
                        .join(", "),
                    },
                  ].map(({ label, value }, index) => (
                    <div key={index + 1} className="flex">
                      <p
                        className="
                          whitespace-nowrap font-bold
                          text-[12px] sm:text-lg
                          text-white [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB]
                        "
                      >
                        {label} :
                      </p>
                      <p
                        className="
                          font-bold ml-1
                          text-[12px] sm:text-lg
                          text-white [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB]
                        "
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {(pokemon?.evolution ?? []).length > 0 && (
                <div>
                  <p
                    className="
                      text-primary [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB] 
                      text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4
                    "
                  >
                    Evolution
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-2 md:gap-4">
                    {pokemon!.evolution.map((evo) => (
                      <PokemonCardComponent key={evo} name={evo} />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <p
                  className="
                    text-primary [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB]
                    text-xl sm:text-2xl lg:text-3xl font-bold mb-2 lg:mb-4
                  "
                >
                  Stats
                </p>
                <div className="flex flex-row w-auto">
                  <div className="flex flex-col max-w-full gap-2 sm:gap-4">
                    {pokemon?.stats.map((stat, index) => (
                      <p
                        key={index + 1}
                        className="
                          whitespace-nowrap font-bold
                          text-[12px] sm:text-lg h-auto sm:h-7
                          text-white [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB]
                        "
                      >
                        {capitalize(stat.stat.name)}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-col w-full gap-2 sm:gap-4">
                    {pokemon?.stats.map((stat, index) => (
                      <div
                        key={index + 1}
                        className="mx-2 h-[18px] sm:h-7 place-content-center"
                      >
                        <ProgressBarComponent progress={stat.base_stat ?? 0} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
