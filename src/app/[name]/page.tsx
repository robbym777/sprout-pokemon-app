import { getDetailPokemon } from "@/services";

type Props = {
  params: Promise<{ name: string }>;
};

const Page = async ({ params }: Props) => {
  const name = (await params).name;
  const pokemon = await getDetailPokemon({ name });
  console.log(pokemon?.color);
  
  return (
    <div
      style={{ backgroundColor: pokemon?.color }}
    >
      <p>{pokemon?.name}</p>
      <img alt="sprites" src={pokemon?.sprites} />
    </div>
  );
};

export default Page;
