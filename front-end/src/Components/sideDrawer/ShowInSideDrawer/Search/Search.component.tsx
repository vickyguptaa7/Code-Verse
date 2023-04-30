import { useEffect, useRef } from "react";
import { VscChevronRight, VscReplaceAll } from "react-icons/vsc";
import {
  setIsReplaceOpen,
  updateReplacementText,
  updateSearchedText,
} from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import { mergeClass } from "../../../../library/tailwindMerge/tailwindMerge.lib";
import Button from "../../../UI/Button.component";
import Loader from "../../../UI/Loader/Loader.component";
import SearchInput from "./Basic/SearchInput.component";
import SearchResult from "./SearchResult.component";
import useSearch from "./hooks/useSearch.hook";

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);

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
  const isSearching = useAppSelector((state) => state.search.isSearching);
  const isReplaceButtonDisable = searchedResultFiles.length === 0;

  const dispatch = useAppDispatch();
  const { findSearchedTextInFiles, replaceTextInFiles } = useSearch();

  /* 
    when the searched text is changed, we need to find the searched text in the files 
    and update the store with the result or if filesInformation is changed, 
    we need to find the searched text in the files
  */
  useEffect(() => {
    findSearchedTextInFiles();
    // eslint-disable-next-line 
  }, [initialSearchedText, filesInformation]);

  const updateSearcheTextInStore = (searchedText: string) => {
    dispatch(updateSearchedText(searchedText));
  };
  const updateReplaceTextInStore = (searchedText: string) => {
    dispatch(updateReplacementText(searchedText));
  };

  const toggleSearchHandler = () => {
    dispatch(setIsReplaceOpen(!isReplaceOpen));
  };

  return (
    <>
      <div className="flex cursor-pointer  py-0.5 pl-1 gap-1">
        <div
          className="flex items-center justify-center h-full p-1 hover:bg-[color:var(--hover-text-color)]"
          onClick={toggleSearchHandler}
        >
          <VscChevronRight
            className={mergeClass([isReplaceOpen ? "rotate-90" : "","duration-200"])}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-2 pr-1">
          <SearchInput
            initialInput={initialSearchedText}
            durationForDebounce={800}
            updateInStoreText={updateSearcheTextInStore}
            inputRef={searchRef}
            name="Search"
          />
          {isReplaceOpen ? (
            <div className="flex items-center justify-center w-full gap-2">
              <SearchInput
                initialInput={initialReplaceText}
                durationForDebounce={600}
                updateInStoreText={updateReplaceTextInStore}
                inputRef={replaceRef}
                name="Replace"
              />
              <Button
                className={mergeClass([
                  "hover:bg-[color:var(--hover-text-color)] p-1 text-[1.2rem] rounded-md",
                  isReplaceButtonDisable
                    ? "hover:bg-transparent text-[color:var(--primary-text-color)]"
                    : "",
                ])}
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
      {initialSearchedText.length > 0 ? (
        isSearching ? (
          <Loader type={"spinner"} />
        ) : (
          <SearchResult filesInformation={filesInformation} />
        )
      ) : null}
    </>
  );
};

export default Search;
