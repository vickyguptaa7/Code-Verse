import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../../../UI/Input.component";

const SearchExtension = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchInFocus, setIsSearchInFocus] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex cursor-pointer  py-0.5 pl-5 gap-1">
      <Input
        inputRef={inputRef}
        name="search"
        onFocus={() => setIsSearchInFocus(true)}
        onBlur={() => setIsSearchInFocus(false)}
        type=""
        className={twMerge(
          "w-full px-2 py-1.5 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
          isSearchInFocus ? " border-red-900" : ""
        )}
        placeholder="Search Extensions In Marketplace"
      />
    </div>
  );
};

export default SearchExtension;
