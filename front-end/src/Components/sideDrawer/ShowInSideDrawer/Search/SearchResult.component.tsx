import React from "react";
import useScroll from "../../../../hooks/useScroll.hook";
import { IFilesInforation } from "../../../../Interface/file.interface";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { setSearchedResultFiles } from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import SearchedFileCard from "./Basic/SearchedFileCard.component";
const EDITOR_MIN_HEIGHT = 480;
interface IPROPS {
  filesInformation: IFilesInforation;
}

const SearchResult: React.FC<IPROPS> = ({ filesInformation }) => {
  const searchedResultFiles = useAppSelector(
    (state) => state.search.searchedResultFiles
  );
  const isReplaceOpen = useAppSelector((state) => state.search.isReplaceOpen);
  let height = Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 115;
  height -= isReplaceOpen ? 40 : 0;

  const dispatch = useAppDispatch();
  const { scrollToTarget } = useScroll();
  const removeFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(
      setSearchedResultFiles(
        searchedResultFiles.filter((file) => id !== file.id)
      )
    );
  };
  const openFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(addFileToNavigation({ id: id, type: "file" }));
    scrollToTarget(id);
  };
  console.log(searchedResultFiles);
  let searchedResults = ({ index, style }: { index: any; style: any }) => (
    <div style={style}>
      <SearchedFileCard
        key={searchedResultFiles[index].id}
        iconUrls={filesInformation[searchedResultFiles[index].id].iconUrls}
        name={filesInformation[searchedResultFiles[index].id].name}
        id={searchedResultFiles[index].id}
        openFileHandler={openFileHandler}
        removeHandler={removeFileHandler}
      />
    </div>
  );
  return (
    <div
      className="flex flex-col gap-2 mt-3 overflow-scroll"
      style={{ height: height }}
    >
      <div className="pl-8">
        <h3 className="text-[color:var(--primary-text-color)]">
          Present in {searchedResultFiles.length} files
        </h3>
      </div>
      <div className="h-full">
        {searchedResultFiles.length ? (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                itemCount={searchedResultFiles.length}
                itemSize={28}
                width={width}
              >
                {searchedResults}
              </List>
            )}
          </AutoSizer>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResult;
