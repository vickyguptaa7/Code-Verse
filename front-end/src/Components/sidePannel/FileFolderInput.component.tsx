import React from "react";
import IDirectory from "../../@types/directory.d";
import { IFile } from "../../@types/file.d";
import {
  addExternalFileOrFolderToDirectory,
  setFilesInformation,
} from "../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

import {
  addNotification,
  removeNotification,
} from "../../Store/reducres/Notification/Notification.reducer";
import { uniqueIdGenerator } from "../../library/uuid/uuid.lib";
import { sortDirectory } from "../../utils/fileFolder.utils";
import { processFileUpload } from "../../utils/uploadFileFolder.utils";
import { ACCEPTED_FILES } from "./SidePannel.constants";
import { ERROR_NOTIFICATION_MESSAGE } from "../Layout/Notification/notification.constant";

/* 
this makes it so that we can use the directory webkitdirectory 
and mozdirectory attribute on the input element
*/
declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

const FileFolderInput = () => {
  const dispatch = useAppDispatch();
  const folderIcons = useAppSelector((state) => state.Directory.folderIcons);
  const fileIcons = useAppSelector((state) => state.Directory.fileIcons);

  // this is a handler for the file input element
  // no web worker is used for uploading files to the browser
  const openFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // show notification that files are uploading
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Please wait files are uploading...",
        isWaitUntilComplete: true,
        type: "info",
      })
    );

    // get the files from the input element
    const files = e.target.files;
    const tempDirectory: Array<IDirectory> = [];
    const tempFilesInformation: Array<IFile> = [];

    // process the files
    for (const fileKey in files) {
      if (isNaN(parseInt(fileKey))) continue;
      await processFileUpload(
        files[parseInt(fileKey)],
        tempDirectory,
        tempFilesInformation,
        fileIcons,
        true,
        "root",
        "root"
      );
    }

    // add the files to the redux store
    dispatch(addExternalFileOrFolderToDirectory(tempDirectory));
    dispatch(setFilesInformation(tempFilesInformation));

    // clear the input element
    e.target.value = "";

    // dispatch a notification that files are uploaded successfully and remove the previous notification
    dispatch(
      addNotification({
        id: uniqueIdGenerator(),
        description: "Files uploaded successfully",
        isWaitUntilComplete: false,
        type: "success",
      })
    );
    dispatch(
      removeNotification({
        id: notificationId,
      })
    );
  };

  // this is a handler for the folder input element
  // a web worker is used for uploading files to the browser as it is a time consuming task
  const openFolderHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // show notification that folder is uploading
    const notificationId = uniqueIdGenerator();
    dispatch(
      addNotification({
        id: notificationId,
        description: "Please wait folder is uploading...",
        isWaitUntilComplete: true,
        type: "info",
      })
    );

    // get the files from the input element
    let files = e.target.files;
    if (!files) return;

    // create a web worker for uploading files
    const folderUploadWorker = new Worker(
      new URL("../../worker/folderUpload.worker", import.meta.url)
    );

    // send the files to the web worker
    folderUploadWorker.postMessage({ files, folderIcons, fileIcons });

    // handle the error response from the web worker
    folderUploadWorker.onerror = (err) => {
      // clear the input element
      e.target.value = "";

      // dispatch a notification that something went wrong and remove the previous notification
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: ERROR_NOTIFICATION_MESSAGE,
          isWaitUntilComplete: false,
          type: "error",
        })
      );
      dispatch(
        removeNotification({
          id: notificationId,
        })
      );
      // terminate the web worker
      folderUploadWorker.terminate();
    };

    // handle the success response from the web worker
    folderUploadWorker.onmessage = (event) => {
      // get the new directory and files information from the web worker
      const { newDirectory, newFilesInformation } = event.data;

      // sort the directory
      sortDirectory(newDirectory);

      // add the files to the redux store
      dispatch(addExternalFileOrFolderToDirectory([newDirectory]));
      dispatch(setFilesInformation(newFilesInformation));

      // clear the input element
      e.target.value = "";

      // dispatch a notification that folder is uploaded successfully and remove the previous notification
      dispatch(
        addNotification({
          id: uniqueIdGenerator(),
          description: "Folder uploaded successfully",
          isWaitUntilComplete: false,
          type: "success",
        })
      );
      dispatch(
        removeNotification({
          id: notificationId,
        })
      );

      // terminate the web worker
      folderUploadWorker.terminate();
    };
  };

  return (
    <>
      <input
        type="file"
        id="file"
        name="file"
        multiple
        accept={ACCEPTED_FILES}
        className="hidden"
        onChange={openFileHandler}
      />
      <input
        type="file"
        id="folder"
        name="folder"
        directory=""
        webkitdirectory=""
        className="hidden"
        onChange={openFolderHandler}
      />
    </>
  );
};

export default FileFolderInput;
