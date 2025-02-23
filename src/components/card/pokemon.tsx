import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDetailPokemon, Pokemon } from "@/services";
import CircularLoading from "./circularLoading";
import { capitalize } from "@/utils";
import Image from "next/image";

interface PokemonCardComponentProps {
  name: string;
}

const PokemonCardComponent = ({ name }: PokemonCardComponentProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<string | undefined>();
  const [data, setData] = useState<Pokemon | undefined>();

  useEffect(() => {
    getDetailPokemon({ name: name }).then((detail) => {
      if (detail) setData(detail);
    });
  }, [name]);

  return (
    <button
      style={{
        backgroundImage: `linear-gradient(180deg, ${data?.color ?? "#000000"}, #000000)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 200%",
        backgroundPosition: data?.name === isHovered ? "0% 100%" : "0% 0%",
        transition: "background-position 0.25s linear",
      }}
      className="
        flex flex-col items-center justify-between p-4 rounded-lg aspect-[3/4] w-full h-full
        shadow-xl hover:scale-105 transition-transform duration-1000
        hover:border-2 border-secondary hover:border-opacity-50"
      onMouseEnter={() => setIsHovered(data?.name)}
      onMouseLeave={() => setIsHovered(undefined)}
      onClick={() => {
        if (data) router.push(`/${data.name}`);
      }}
    >
      <p
        className={`font-semibold text-primary [text-shadow:_-2px_-2px_4_#4062AB,2px_2px_4_#4062AB] text-[5vw] sm:text-[24px]`}
      >
        {capitalize(name)}
      </p>
      {data?.sprites ? (
        <Image
          src={{ src: data?.sprites, width: 512, height: 512 }}
          alt="sprites"
          className="w-auto h-[60%]"
        />
      ) : (
        <CircularLoading />
      )}
    </button>
  );
};

export default PokemonCardComponent;
