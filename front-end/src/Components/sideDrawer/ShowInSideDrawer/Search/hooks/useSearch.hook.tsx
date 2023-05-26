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
import { ERROR_NOTIFICATION_MESSAGE } from "../../../../Layout/Notification/notification.constant";

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
    // if the searched text is empty, we don't need to search
    if (searchedText.length === 0) return [];

    // display the loader and start searching
    dispatch(setIsSearching(true));

    // create a new worker for searching
    const searchWorker = new Worker(
      new URL("./../../../../../worker/search.worker.ts", import.meta.url)
    );

    // send the files information and searched text to the worker
    searchWorker.postMessage({ filesInformation, searchedText });

    // if there is while searching on the worker
    searchWorker.onerror = (err) => {
      console.error(err);
      // display the error notification and stop the loader
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: ERROR_NOTIFICATION_MESSAGE,
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(setIsSearching(false));

      // terminate the web worker
      searchWorker.terminate();
    };

    // if the worker finished searching
    searchWorker.onmessage = (e) => {
      // get the matching files from the worker
      const { matchingFiles } = e.data;

      //set the matching files to the redux store and stop the loader
      dispatch(setSearchedResultFiles(matchingFiles));
      dispatch(setIsSearching(false));

      // terminate the web worker
      searchWorker.terminate();
    };
  };
  const replaceTextInFiles = async (targetFiles = searchedResultFiles) => {
    // display the notification
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Replacing text in files",
        isWaitUntilComplete: true,
        type: "info",
      })
    );

    // create a new worker for replacing
    const replaceWorker = new Worker(
      new URL("./../../../../../worker/replace.worker.ts", import.meta.url)
    );

    // send the files information, target files, searched text and replacement text to the worker
    replaceWorker.postMessage({
      filesInformation,
      targetFiles,
      searchedText,
      replacedText,
    });

    // if there is an error while replacing
    replaceWorker.onerror = (err) => {
      console.error(err);
      // display the error notification and remove the previous notification
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: ERROR_NOTIFICATION_MESSAGE,
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(removeNotification({ id: notificationId }));

      // terminate the web worker
      replaceWorker.terminate();
    };

    // if the worker finished replacing
    replaceWorker.onmessage = (e) => {
      // get the updated files information from the worker
      const { updatedFilesInfo } = e.data;
      // update the files information in the redux store and display the success notification
      dispatch(updateFileBody(updatedFilesInfo));
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Replaced successfully",
          isWaitUntilComplete: false,
          type: "success",
        })
      );
      // remove the previous notification
      dispatch(removeNotification({ id: notificationId }));

      // terminate the web worker
      replaceWorker.terminate();
    };
  };
  return {
    findSearchedTextInFiles,
    replaceTextInFiles,
  };
};

export default useSearch;
