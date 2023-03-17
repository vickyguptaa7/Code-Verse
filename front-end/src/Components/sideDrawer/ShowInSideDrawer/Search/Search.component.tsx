import React, { useEffect, useRef, useState } from "react";
import { VscChevronRight, VscReplaceAll } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import {
  IFilesInforation,
  INavFile,
} from "../../../../Interface/file.interface";
import { useAppSelector } from "../../../../Store/store";
import Button from "../../../UI/Button.component";
import SearchInput from "./Basic/SearchInput.component";
import SearchResult from "./SearchResult.component";

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const { findSearchedTextInFiles } = useSearch();
  let data = findSearchedTextInFiles(filesInformation, searchedText);

  const toggleSearchHandler = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(event.currentTarget.value.trim());
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
          />
          {isSearchOpen ? (
            <div className="flex items-center justify-center w-full gap-2">
              <SearchInput name="Replace" onChangeHandler={onChangeHandler} />
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
          searchedText={searchedText}
          searchedResult={data}
          filesInformation={filesInformation}
        />
      ) : null}
    </>
  );
};

const useSearch = () => {
  const findSearchedTextInFiles = (
    filesInformation: IFilesInforation,
    searchedText: string
  ) => {
    if (searchedText.length === 0) return [];
    const matchingFiles = new Array<INavFile>();
    for (const key in filesInformation) {
      if (key === "settings" || key === "extension") continue;
      if (filesInformation[key].body.includes(searchedText)) {
        matchingFiles.push({ id: key, type: "file" });
      }
    }
    return matchingFiles;
  };
  return {
    findSearchedTextInFiles,
  };
};

export default Search;
