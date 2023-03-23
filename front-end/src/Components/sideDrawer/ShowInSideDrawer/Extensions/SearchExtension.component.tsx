import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDebounce from "../../../../hooks/useDebounce.hook";
import useInputFocus from "../../../../hooks/useInputFocus.hook";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import { updateExtensionSearchedText } from "../../../../Store/reducres/SideDrawer/Extensions/Extensions.reducer";
import Input from "../../../UI/Input.component";

const SearchExtension = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchInFocus, setIsSearchInFocus] = useState(true);
  const dispatch = useAppDispatch();
  const extensionSearchedText = useAppSelector(
    (state) => state.extension.extensionSearchedText
  );
  const [searchedText, setSearchedText] = useState(extensionSearchedText);
  const updateStoreExtensionSearchedText = (text: string) => {
    dispatch(updateExtensionSearchedText(text));
  };
  
  const debouncedUpdateExtensionSearchedText = useDebounce(
    updateStoreExtensionSearchedText,
    500
  );
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
    debouncedUpdateExtensionSearchedText(event.target.value);
  };

  useInputFocus(inputRef);

  return (
      <div className="flex cursor-pointer py-0.5 pl-5 gap-2 flex-col">
        <Input
          inputRef={inputRef}
          name="search"
          onFocus={() => setIsSearchInFocus(true)}
          onBlur={() => setIsSearchInFocus(false)}
          type=""
          value={searchedText}
          onChange={onChangeHandler}
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
