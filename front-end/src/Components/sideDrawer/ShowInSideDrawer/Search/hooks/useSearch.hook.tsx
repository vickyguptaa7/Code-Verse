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
    const searchWorker = new Worker("./worker/search.worker.js", {
      type: "module",
    });
    searchWorker.postMessage({ filesInformation, searchedText });
    searchWorker.onerror = (err) => {
      console.log(err);
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Something went wrong...",
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(setIsSearching(false));
      searchWorker.terminate();
    };
    searchWorker.onmessage = (e) => {
      const { matchingFiles } = e.data;
      dispatch(setSearchedResultFiles(matchingFiles));
      dispatch(setIsSearching(false));
      searchWorker.terminate();
    };
  };
  const replaceTextInFiles = async (targetFiles = searchedResultFiles) => {
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Replacing text in files",
        isWaitUntilComplete: true,
        type: "info",
      })
    );
    const replaceWorker = new Worker("./worker/replace.worker.js", {
      type: "module",
    });
    replaceWorker.postMessage({
      filesInformation,
      targetFiles,
      searchedText,
      replacedText,
    });
    replaceWorker.onerror = (err) => {
      console.log(err);
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Something went wrong...",
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(removeNotification({ id: notificationId }));
      replaceWorker.terminate();
    };
    replaceWorker.onmessage = (e) => {
      const { updatedFilesInfo } = e.data;
      dispatch(updateFileBody(updatedFilesInfo));
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Replaced successfully",
          isWaitUntilComplete: false,
          type: "success",
        })
      );
      dispatch(removeNotification({ id: notificationId }));
      replaceWorker.terminate();
    };
  };
  return {
    findSearchedTextInFiles,
    replaceTextInFiles,
  };
};

export default useSearch;
