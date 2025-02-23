import Image from "next/image";

const LoadMoreLoading = () => {
  return (
    <div className="flex items-center justify-center w-full p-2 bg-gradient-to-b from-primary to-secondary animate-pulse">
      <p className={`text-[20px] text-primary text-shadow-all font-semibold`}>
        Loading
      </p>
      <Image
        src={{
          src: "/pokemon.svg",
          width: 64,
          height: 64,
        }}
        alt="pokemon-logo"
        className="w-[64px] h-auto ml-2"
      />
    </div>
  );
};
export default LoadMoreLoading;
