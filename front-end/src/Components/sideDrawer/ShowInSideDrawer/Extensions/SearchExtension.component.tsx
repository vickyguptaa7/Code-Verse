import React, { useRef, useState } from "react";
import { updateExtensionSearchedText } from "../../../../Store/reducres/SideDrawer/Extensions/Extensions.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import useDebounce from "../../../../hooks/useDebounce.hook";
import useInputFocus from "../../../../hooks/useInputFocus.hook";
import { mergeClass } from "../../../../library/tailwindMerge/tailwindMerge.lib";
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

  // we use debounce to prevent the store from updating on every key stroke
  const debouncedUpdateExtensionSearchedText = useDebounce(
    updateStoreExtensionSearchedText,
    500
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.target.value);
    debouncedUpdateExtensionSearchedText(event.target.value);
  };

  // focus the input when the component is mounted
  useInputFocus(inputRef);

  return (
    <div className="flex cursor-pointer py-0.5 pl-5 gap-2 flex-col">
      <Input
        inputRef={inputRef}
        name="search"
        onFocus={() => setIsSearchInFocus(true)}
        onBlur={() => setIsSearchInFocus(false)}
        type="text"
        value={searchedText}
        onChange={onChangeHandler}
        className={mergeClass([
          "w-full px-2 py-1.5 bg-[color:var(--input-bg-color)] border border-[color:var(--input-border-color)] selection:bg-[color:var(--accent-color)]",
          isSearchInFocus ? " border-[color:var(--primary-color)]" : "",
        ])}
        placeholder="Search Extensions In Marketplace"
      />
    </div>
  );
};

export default SearchExtension;
