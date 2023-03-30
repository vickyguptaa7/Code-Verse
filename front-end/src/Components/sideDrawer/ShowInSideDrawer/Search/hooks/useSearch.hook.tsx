import { IFile, INavFile } from "../../../../../Interface/file.interface";
import { updateFileBody } from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { setSearchedResultFiles } from "../../../../../Store/reducres/SideDrawer/Search/Search.reducer";
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

  const findSearchedTextInFiles = async () => {
    console.log("find", searchedText);
    if (searchedText.length === 0) return [];
    const matchingFiles = new Array<INavFile>();
    for (const key in filesInformation) {
      const getResult = async (file: IFile) => {
        return new Promise((resolve, reject) => {
            if (file.id === "settings" || file.id === "extension")
              resolve(null);
            if (
              file.body.toLocaleLowerCase().includes(searchedText.toLowerCase())
            ) {
              console.log(file.id);
              matchingFiles.push({ id: file.id, type: "file" });
            }
            resolve(null);

        });
      };
      await getResult(filesInformation[key]);
    }
    console.log("dis", matchingFiles);
    dispatch(setSearchedResultFiles(matchingFiles));
  };
  const replaceTextInFiles = (targetFiles = searchedResultFiles) => {
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
