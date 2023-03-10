import React, { useEffect, useRef, useState } from "react";
import { VscChevronRight, VscReplaceAll } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import Button from "../../../UI/Button.component";
import Input from "../../../UI/Input.component";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchInFocus, setIsSearchInFocus] = useState(true);
  const [isReplaceInFocus, setIsReplaceInFocus] = useState(false);

  const toggleSearchHandler = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex cursor-pointer  py-0.5 px-1 gap-1">
      <div
        className="flex items-center justify-center h-full p-1 hover:bg-[color:var(--hover-text-color)]"
        onClick={toggleSearchHandler}
      >
        <VscChevronRight className={twMerge(isSearchOpen ? "rotate-90" : "")} />
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Input
          inputRef={inputRef}
          name="search"
          onFocus={() => setIsSearchInFocus(true)}
          onBlur={() => setIsSearchInFocus(false)}
          type=""
          className={twMerge(
            "w-full px-2 py-1 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
            isSearchInFocus ? " border-red-900" : ""
          )}
          placeholder="Search"
        />
        {isSearchOpen ? (
          <div className="flex items-center justify-center w-full gap-2">
            <Input
              inputRef={inputRef}
              name="replace"
              type=""
              onFocus={() => setIsReplaceInFocus(true)}
              onBlur={() => setIsReplaceInFocus(false)}
              className={twMerge(
                "w-full px-2 py-1 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
                isReplaceInFocus ? " border-red-900" : ""
              )}
              placeholder="Replace"
            />
            <Button
              className="hover:bg-[color:var(--hover-text-color)] p-1 rounded-md"
              title="Replace All"
            >
              <VscReplaceAll />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
