import { IFile, INavFile } from "../../../../../Interface/file.interface";
import {
  addNotification,
  removeNotification,
} from "../../../../../Store/reducres/Notification/Notification.reducer";
import { updateFileBody } from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import {
  setIsSearching,
  setSearchedResultFiles,
} from "../../../../../Store/reducres/SideDrawer/Search/Search.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import { uniqueIdGenerator } from "../../../../../library/uuid/uuid.lib";

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
    dispatch(setIsSearching(true));
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
              matchingFiles.push({ id: file.id, type: "file" });
            }
            resolve(null);
          }, 0);
        });
      };
      await getResult(filesInformation[key]);
    }
    dispatch(setSearchedResultFiles(matchingFiles));
    dispatch(setIsSearching(false));
  };
  const replaceTextInFiles = async (targetFiles = searchedResultFiles) => {
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Replacing text in files",
        isWaitUntilComplete: true,
      })
    );
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
    dispatch(
      addNotification({
        id: uniqueIdGenerator(),
        description: "Replaced successfully",
        isWaitUntilComplete: false,
      })
    );
    dispatch(removeNotification({ id: notificationId }));
  };
  return {
    findSearchedTextInFiles,
    replaceTextInFiles,
  };
};

export default useSearch;
