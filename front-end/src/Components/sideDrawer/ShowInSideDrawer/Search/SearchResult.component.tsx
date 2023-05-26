import React from "react";
import { IFilesInforation } from "../../../../@types/file.d";
import { CODE_EDITOR_MIN_HEIGHT } from "../../../../Pages/CodeEditor.page";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { setSearchedResultFiles } from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import VirtualList from "../../../../library/reactWindow/virtualList.lib";
import { scrollToTarget } from "../../../../utils/scrollToTargetId.util";
import { SEARCHED_FILE_CARD_HIGHT } from "../../sideDrawer.Constant";
import SearchedFileCard from "./Basic/SearchedFileCard.component";

// hight adjustment is used to adjust the height of the search in search drawer
const HIGHT_ADJUSTMENT = 120;

interface IPROPS {
  filesInformation: IFilesInforation;
}

const SearchResult: React.FC<IPROPS> = ({ filesInformation }) => {
  const dispatch = useAppDispatch();
  const searchedResultFiles = useAppSelector(
    (state) => state.search.searchedResultFiles
  );
  const isReplaceOpen = useAppSelector((state) => state.search.isReplaceOpen);

  // hight adjustment is used to adjust the height of the search in search drawer
  let height =
    Math.max(document.body.clientHeight, CODE_EDITOR_MIN_HEIGHT) -
    HIGHT_ADJUSTMENT;
  height -= isReplaceOpen ? 40 : 0;

  // remove the file from the search result
  const removeFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(
      setSearchedResultFiles(
        searchedResultFiles.filter((file) => id !== file.id)
      )
    );
  };

  // open the file in the code editor
  const openFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(addFileToNavigation({ id: id, type: "file" }));
    scrollToTarget(id);
  };

  // map the searched result files to the searched file card
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
    <div className="flex flex-col gap-2 mt-3" style={{ height: height }}>
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
