import { Input } from "@/Components/UI/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search repositories...",
  debounceMs = 500,
}) => {
  const [internal, setInternal] = useState(value);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (internal !== value) onChange(internal);
    }, debounceMs);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [internal, debounceMs]);

  return (
    <div className="relative max-w-xl mx-auto my-4 w-full">
      <Input
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 h-12 rounded-xl border-zinc-200 dark:border-zinc-800 shadow focus:ring-2 focus:ring-blue-500/20 transition-all bg-white/90 dark:bg-zinc-900/60"
        aria-label="Search repositories"
        autoFocus
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
    </div>
  );
};

export default SearchInput;
