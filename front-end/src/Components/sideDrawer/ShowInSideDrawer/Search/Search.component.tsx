import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import { VscChevronRight, VscReplaceAll } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

import { INavFile } from "../../../../Interface/file.interface";

import Button from "../../../UI/Button.component";
import SearchInput from "./Basic/SearchInput.component";
import SearchResult from "./SearchResult.component";

import { setSearchedText as updateSearchedText } from "../../../../Store/reducres/SideDrawer/SideDrawer.reducer";

import useDebounce from "../../../../hooks/useDebounce.hook";
import useSearch from "./hooks/useSearch.hook";
import useInputFocus from "../../../../hooks/useInputFocus.hook";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const initialSearchedText = useAppSelector(
    (state) => state.sideDrawer.searchedText
  );

  const [searchedText, setSearchedText] = useState(initialSearchedText);
  const dispatch = useAppDispatch();
  const { findSearchedTextInFiles } = useSearch();
  const [searchResults, setSearchResults] = useState<INavFile[]>([]);
  // to avoid redundant space on start and end

  // updating the search results as store searchtext changes as store search text changes with some delay so we reduce the no of find calls
  useEffect(() => {
    setSearchResults(
      findSearchedTextInFiles(filesInformation, initialSearchedText.trim())
    );
  }, [initialSearchedText, filesInformation]);

  // for the initial focus on the search input
  useInputFocus(inputRef);

  const updateSearcheTextInStore = (searchedText: string) => {
    dispatch(updateSearchedText(searchedText));
  };

  const debouncedUpdateSearchedTextInStore = useDebounce(
    updateSearcheTextInStore,
    200
  );

  const toggleSearchHandler = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.currentTarget.value);
    debouncedUpdateSearchedTextInStore(event.currentTarget.value);
    console.log("changeInput");
  };

  return (
    <>
      <div className="flex cursor-pointer  py-0.5 pl-1 gap-1">
        <div
          className="flex items-center justify-center h-full p-1 hover:bg-[color:var(--hover-text-color)]"
          onClick={toggleSearchHandler}
        >
          <VscChevronRight
            className={twMerge(isSearchOpen ? "rotate-90" : "")}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <SearchInput
            inputRef={inputRef}
            name="Search"
            onChangeHandler={onChangeHandler}
            value={searchedText}
          />
          {isSearchOpen ? (
            <div className="flex items-center justify-center w-full gap-2">
              <SearchInput name="Replace" onChangeHandler={() => {}} />
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
      {searchedText.length > 0 ? (
        <SearchResult
          searchedResult={searchResults}
          filesInformation={filesInformation}
        />
      ) : null}
    </>
  );
};

export default Search;
