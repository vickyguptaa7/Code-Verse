import React from "react";
import useScroll from "../../../../hooks/useScroll.hook";
import { IFilesInforation } from "../../../../Interface/file.interface";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { setSearchedResultFiles } from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";

import SearchedFileCard from "./Basic/SearchedFileCard.component";
import VirtualList from "../../../../library/reactWindow/virtualList.lib";

const EDITOR_MIN_HEIGHT = 480;
const SEARCHED_FILE_CARD_HIGHT = 28;
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
  const list = searchedResultFiles.map((file) => {
    return (
      <SearchedFileCard
        key={file.id}
        iconUrls={filesInformation[file.id].iconUrls}
        name={filesInformation[file.id].name}
        id={file.id}
        openFileHandler={openFileHandler}
        removeHandler={removeFileHandler}
      />
    );
  });
  return (
    <div
      className="flex flex-col gap-2 mt-3"
      style={{ height: height }}
    >
      <div className="pl-8">
        <h3 className="text-[color:var(--primary-text-color)]">
          Present in {searchedResultFiles.length} files
        </h3>
      </div>
      <div className="h-full">
        {searchedResultFiles.length ? (
          <VirtualList
            itemCount={searchedResultFiles.length}
            itemSize={SEARCHED_FILE_CARD_HIGHT}
            list={list}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SearchResult;
