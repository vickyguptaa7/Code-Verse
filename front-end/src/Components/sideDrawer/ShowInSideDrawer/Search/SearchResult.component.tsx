import React, { useEffect, useState } from "react";
import {
  IFilesInforation,
  INavFile,
} from "../../../../Interface/file.interface";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch } from "../../../../Store/store";
import SearchedFileCard from "./Basic/SearchedFileCard.component";

interface IPROPS {
  searchedText: string;
  searchedResult: Array<INavFile>;
  filesInformation: IFilesInforation;
}

const SearchResult: React.FC<IPROPS> = ({
  searchedText,
  searchedResult,
  filesInformation,
}) => {
  const [searchedResultState, setSearchedResultState] =
    useState(searchedResult);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchedResultState(searchedResult);
  }, [searchedResult]);

  const removeFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setSearchedResultState(searchedResult.filter((file) => id !== file.id));
  };
  const openFileHandler = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(addFileToNavigation({ id: id, type: "file" }));
  };

  let results = searchedResultState.map((file) => (
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
