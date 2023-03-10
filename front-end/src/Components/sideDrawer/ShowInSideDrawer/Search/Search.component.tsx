import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import Input from "../../../UI/Input.component";

const Search = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchHandler = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div
      className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
      onClick={toggleSearchHandler}
    >
      <div className="flex items-center justify-center p-1">
        <VscChevronRight className={twMerge(isSearchOpen ? "rotate-90" : "")} />
      </div>
      <div className="flex items-center justify-center">
        <Input inputRef={null} type="" className="" />
      </div>
    </div>
  );
};

export default Search;
