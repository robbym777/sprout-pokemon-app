import { capitalize } from "@/utils";
import { useRef, useState } from "react";

interface FormSelectComponentProps {
  options: string[];
  onSelect: (value: string) => void;
}

const FormSelectComponent = ({
  options,
  onSelect,
}: FormSelectComponentProps) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      setFiltered(
        options.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFiltered([]);
    }
  };

  return (
    <div className="relative w-1/2 sm:w-1/2 lg:w-[500px]">
      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder="Search Pokémon..."
        className="
          rounded-md bg-white px-3.5 py-2 focus:ring-secondary focus:border-secondary
        text-secondary text-[11.5px] sm:text-[16px] text-base/3 sm:text-base/7 font-semibold
         w-full h-[32px] sm:h-[48px]
        "
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Delay hiding to allow click
      />
      {isFocused && filtered.length > 0 && (
        <ul className="
          flex flex-col absolute left-0 right-0 bg-white border border-gray-300 rounded-lg
          mt-1 max-h-40 overflow-y-auto shadow-lg z-50 
        ">
          {filtered.map((item, index) => (
            <button
              key={index + 1}
              className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
              onMouseDown={(e) => e.preventDefault()} // Prevent losing focus when clicking
              onClick={() => {
                setQuery("");
                setIsFocused(false);
                setFiltered([]);
                onSelect(item);
              }}
            >
              {capitalize(item)}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormSelectComponent;
