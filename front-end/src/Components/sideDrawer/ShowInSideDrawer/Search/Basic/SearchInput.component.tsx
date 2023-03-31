import React, { useState } from "react";
import useDebounce from "../../../../../hooks/useDebounce.hook";
import useInputFocus from "../../../../../hooks/useInputFocus.hook";
import { mergeClass } from "../../../../../library/tailwindMerge/tailwindMerge.lib";
import Input from "../../../../UI/Input.component";

interface IPROPS {
  inputRef: React.RefObject<HTMLInputElement>;
  name: string;
  initialInput: string;
  value?: string;
  durationForDebounce: number;
  updateInStoreText: Function;
}

const SearchInput: React.FC<IPROPS> = ({
  initialInput,
  inputRef,
  name,
  durationForDebounce,
  updateInStoreText,
}) => {
  const [isInputInFocus, setIsInputInFocus] = useState(true);
  const [inputText, setInputText] = useState(initialInput);

  const debouncedUpdateSearchedTextInStore = useDebounce(
    updateInStoreText,
    durationForDebounce
  );

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(event.currentTarget.value);
    debouncedUpdateSearchedTextInStore(event.currentTarget.value);
    console.log("changeInput");
  };

  // for the initial focus on the search input
  useInputFocus(inputRef);
  return (
    <Input
      autoComplete="off"
      inputRef={inputRef ? inputRef : null}
      name={name}
      type="text"
      onFocus={() => setIsInputInFocus(true)}
      onBlur={() => setIsInputInFocus(false)}
      className={mergeClass([
        "w-full px-2 py-1 bg-[color:var(--sidepannel-color)] border border-transparent selection:bg-[color:var(--accent-color)]",
        isInputInFocus ? " border-red-900" : ""
      ])}
      onChange={onChangeHandler}
      placeholder={name}
      value={inputText}
    />
  );
};

export default SearchInput;
