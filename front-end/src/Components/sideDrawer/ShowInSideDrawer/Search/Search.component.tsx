import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import { VscChevronRight, VscReplaceAll } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

import Button from "../../../UI/Button.component";
import SearchInput from "./Basic/SearchInput.component";
import SearchResult from "./SearchResult.component";

import useDebounce from "../../../../hooks/useDebounce.hook";
import useSearch from "./hooks/useSearch.hook";
import {
  setIsReplaceOpen,
  updateReplacementText,
  setSearchedResultFiles,
  updateSearchedText,
} from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const onMountRef = useRef(true);

  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const initialSearchedText = useAppSelector(
    (state) => state.search.searchedText
  );
  const initialReplaceText = useAppSelector(
    (state) => state.search.replacementText
  );
  const isReplaceOpen = useAppSelector((state) => state.search.isReplaceOpen);
  const searchedResultFiles = useAppSelector(
    (state) => state.search.searchedResultFiles
  );
  const isReplaceButtonDisable = searchedResultFiles.length === 0;
  const [searchedText, setSearchedText] = useState(initialSearchedText);
  const [replaceText, setReplaceText] = useState(initialReplaceText);

  const dispatch = useAppDispatch();
  const { findSearchedTextInFiles, replaceTextInFiles } = useSearch();
  // to avoid redundant space on start and end

  // updating the search results as store searchtext changes as store search text changes with some delay so we reduce the no of find calls
  useEffect(() => {
    // onMountRef is used to avoid the onMount calling dispatch as we have to display the previous stuff
    console.log(onMountRef);
    if (!onMountRef.current)
      dispatch(
        setSearchedResultFiles(
          findSearchedTextInFiles(initialSearchedText.trim())
        )
      );
    else onMountRef.current = false;
    // eslint-disable-next-line 
  }, [initialSearchedText, filesInformation]);

  const updateSearcheTextInStore = (searchedText: string) => {
    dispatch(updateSearchedText(searchedText));
  };
  const updateReplaceTextInStore = (searchedText: string) => {
    dispatch(updateReplacementText(searchedText));
  };

  const debouncedUpdateSearchedTextInStore = useDebounce(
    updateSearcheTextInStore,
    200
  );
  const debouncedUpdateReplaceTextInStore = useDebounce(
    updateReplaceTextInStore,
    200
  );

  const toggleSearchHandler = () => {
    dispatch(setIsReplaceOpen(!isReplaceOpen));
  };

  const onSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchedText(event.currentTarget.value);
    debouncedUpdateSearchedTextInStore(event.currentTarget.value);
    console.log("changeInput");
  };
  const onReplaceChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReplaceText(event.currentTarget.value);
    debouncedUpdateReplaceTextInStore(event.currentTarget.value);
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
            className={twMerge(isReplaceOpen ? "rotate-90" : "")}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <SearchInput
            inputRef={searchRef}
            name="Search"
            onChangeHandler={onSearchChangeHandler}
            value={searchedText}
          />
          {isReplaceOpen ? (
            <div className="flex items-center justify-center w-full gap-2">
              <SearchInput
                inputRef={replaceRef}
                name="Replace"
                onChangeHandler={onReplaceChangeHandler}
                value={replaceText}
              />
              <Button
                className={twMerge(
                  "hover:bg-[color:var(--hover-text-color)] p-1 text-[1.2rem] rounded-md",
                  isReplaceButtonDisable
                    ? "hover:bg-transparent text-[color:var(--primary-text-color)]"
                    : ""
                )}
                title="Replace All"
                disabled={isReplaceButtonDisable}
                onClick={() => replaceTextInFiles()}
              >
                <VscReplaceAll />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {searchedText.length > 0 ? (
        <SearchResult filesInformation={filesInformation} />
      ) : null}
    </>
  );
};

export default Search;
