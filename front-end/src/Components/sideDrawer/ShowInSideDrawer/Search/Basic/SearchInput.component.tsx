import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../../../../UI/Input.component";

interface IPROPS {
  inputRef?: React.RefObject<HTMLInputElement>;
  onChangeHandler: React.ChangeEventHandler;
  name: string;
  value?:string
}

const SearchInput: React.FC<IPROPS> = ({
  inputRef,
  onChangeHandler,
  name,
  value,
}) => {
  const [isInputInFocus, setIsInputInFocus] = useState(true);
  return (
    <Input
      autoComplete="off"
      inputRef={inputRef ? inputRef : null}
      name={name}
      type="text"
      onFocus={() => setIsInputInFocus(true)}
      onBlur={() => setIsInputInFocus(false)}
      className={twMerge(
        "w-full px-2 py-1 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
        isInputInFocus ? " border-red-900" : ""
      )}
      onChange={onChangeHandler}
      placeholder={name}
      value={value}
    />
  );
};

export default SearchInput;
