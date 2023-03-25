import React from "react";
import { IFilesInforation } from "../../../../Interface/file.interface";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { setSearchedResultFiles } from "../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";
import SearchedFileCard from "./Basic/SearchedFileCard.component";

interface IPROPS {
  filesInformation: IFilesInforation;
}

const SearchResult: React.FC<IPROPS> = ({ filesInformation }) => {
  const searchedResultFiles = useAppSelector(
    (state) => state.search.searchedResultFiles
  );

  const dispatch = useAppDispatch();

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
    setTimeout(() => {
      const element = document.getElementById(id);
      console.log(element, "element by id");
      element?.scrollIntoView();
      element?.scrollIntoView(false);
      element?.scrollIntoView({ block: "end" });
      element?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, 10);
  };

  let results = searchedResultFiles.map((file) => (
    <SearchedFileCard
      key={file.id}
      iconUrls={filesInformation[file.id].iconUrls}
      name={filesInformation[file.id].name}
      id={file.id}
      openFileHandler={openFileHandler}
      removeHandler={removeFileHandler}
    />
  ));

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="pl-8">
        <h3 className="text-[color:var(--primary-text-color)]">
          Present in {results.length} files
        </h3>
      </div>
      <div>{results}</div>
    </div>
  );
};

export default SearchResult;
