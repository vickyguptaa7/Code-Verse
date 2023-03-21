import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useInputFocus from "../../../../hooks/useInputFocus.hook";
import Input from "../../../UI/Input.component";
import ExtensionCard from "./ExtensionCard.component";

const SearchExtension = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchInFocus, setIsSearchInFocus] = useState(true);
  const [extensionSearchedText,setExtensionSearchedText]=useState("");
  const onChangeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setExtensionSearchedText(event.target.value);
  }

  useInputFocus(inputRef);

  return (
    <>
    <div className="flex cursor-pointer py-0.5 pl-5 gap-2 flex-col">
      <Input
        inputRef={inputRef}
        name="search"
        onFocus={() => setIsSearchInFocus(true)}
        onBlur={() => setIsSearchInFocus(false)}
        type=""
        value={extensionSearchedText}
        onChange={onChangeHandler}
        className={twMerge(
          "w-full px-2 py-1.5 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
          isSearchInFocus ? " border-red-900" : ""
          )}
          placeholder="Search Extensions In Marketplace"
          />
    </div>
      <div className="">
        {/* <ExtensionCard /> */}
      </div>
    </>
  );
};

export default SearchExtension;
