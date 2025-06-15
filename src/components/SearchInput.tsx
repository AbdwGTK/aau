import { Input } from "@/components/ui/input";
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
    <Input
      value={internal}
      onChange={(e) => setInternal(e.target.value)}
      placeholder={placeholder}
      className="w-full"
      aria-label="Search repositories"
      autoFocus
    />
  );
};

export default SearchInput;
