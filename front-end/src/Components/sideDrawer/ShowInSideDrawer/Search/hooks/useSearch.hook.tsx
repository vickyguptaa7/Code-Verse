import {
  INavFile,
} from "../../../../../Interface/file.interface";
import { updateFileBody } from "../../../../../Store/reducres/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";

const useSearch = () => {
  const dispatch = useAppDispatch();
  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );
  const searchedText = useAppSelector((state) => state.search.searchedText);
  const replacedText = useAppSelector((state) => state.search.replacementText);
  const searchedResultFiles = useAppSelector(
    (state) => state.search.searchedResultFiles
  );

  const findSearchedTextInFiles = (searchedText: string) => {
    console.log("find", searchedText);
    if (searchedText.length === 0) return [];
    const matchingFiles = new Array<INavFile>();
    for (const key in filesInformation) {
      if (key === "settings" || key === "extension") continue;
      if (
        filesInformation[key].body
          .toLocaleLowerCase()
          .includes(searchedText.toLowerCase())
      ) {
        matchingFiles.push({ id: key, type: "file" });
      }
    }
    return matchingFiles;
  };
  const replaceTextInFiles = (targetFiles=searchedResultFiles) => {
    for (const file of targetFiles) {
      if (filesInformation[file.id] === undefined) continue;
      const newString = filesInformation[file.id].body.replaceAll(
        searchedText,
        replacedText
      );
      dispatch(updateFileBody({ id: file.id, body: newString }));
    }
  };
  return {
    findSearchedTextInFiles,
    replaceTextInFiles,
  };
};

export default useSearch;
