import { IFilesInforation, INavFile } from "../../../../../Interface/file.interface";

const useSearch = () => {
  const findSearchedTextInFiles = (
    filesInformation: IFilesInforation,
    searchedText: string
  ) => {
    console.log("find", searchedText);
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

export default useSearch;
