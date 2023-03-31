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
          setTimeout(() => {
            if (file.id === "settings" || file.id === "extension")
              resolve(null);
            if (
              file.body.toLocaleLowerCase().includes(searchedText.toLowerCase())
            ) {
              console.log(file.id);
              matchingFiles.push({ id: file.id, type: "file" });
            }
            resolve(null);
          }, 0);
        });
      };
      await getResult(filesInformation[key]);
    }
    dispatch(setSearchedResultFiles(matchingFiles));
  };
  const replaceTextInFiles = async (targetFiles = searchedResultFiles) => {
    const updatedFilesInfo: Array<{ id: string; body: string }> = [];
    for (const file of targetFiles) {
      const getResult = async (file: INavFile) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (filesInformation[file.id] === undefined) resolve(null);
            console.log("replace");
            const newString = filesInformation[file.id].body.replaceAll(
              new RegExp(searchedText, "ig"),
              replacedText
            );
            updatedFilesInfo.push({ id: file.id, body: newString });
            resolve(null);
          }, 0);
        });
      };
      await getResult(file);
    }
    dispatch(updateFileBody(updatedFilesInfo));
  };
  return {
    findSearchedTextInFiles,
    replaceTextInFiles,
  };
};

export default useSearch;
