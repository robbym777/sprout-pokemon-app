"use client";

import { getListAllPokemon } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormSelectComponent from "../form/select";
import { capitalize } from "@/utils";

const HeaderComponent = () => {
  const router = useRouter();

  const [listPokemon, setListPokemon] = useState<string[]>([]);

  useEffect(() => {
    getListAllPokemon().then((data) => {
      setListPokemon(data ?? []);
    });
  }, []);

  return (
    <nav
      className="bg-primary mx-auto flex items-center justify-between p-2.5 sm:p-6"
      aria-label="Global"
    >
      {/* Logo Icon */}
      <button onClick={() => router.push("/")}>
        <img
          src="/pokemon.svg"
          alt="pokemon-logo"
          className="w-auto h-[7vw] sm:h-[48px]"
        />
      </button>

      {/* Search */}
      <FormSelectComponent
        options={listPokemon.map((name) => capitalize(name))}
        onSelect={(e) => router.push(`/${e}`)}
      />
    </nav>
  );
};
export default HeaderComponent;
