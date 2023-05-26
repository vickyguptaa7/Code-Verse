/* eslint-disable no-restricted-globals */
import IDirectory from "../@types/directory.d";
import { IFile } from "../@types/file.d";
import { findUniqueFileFolderName } from "../utils/fileFolder.utils";
import { processFolderUpload } from "../utils/uploadFileFolder.utils";

/* This code is defining a function that will be executed when a message is received by the web worker.
The function extracts the necessary data from the message, creates a new directory object with a
unique name and ID, and then processes each file in the received files array using the
`processFolderUpload` function. Finally, it sends a message back to the main thread with the new
directory object and an array of new file information. */
self.onmessage = async (e) => {
  const { files, folderIcons, fileIcons } = e.data;

  const { name: folderName, id: folderId } = findUniqueFileFolderName(
    files[0].webkitRelativePath.split("/")[0],
    true,
    true
  );
  const newDirectory: IDirectory = {
    id: folderId,
    parentId: "root",
    name: folderName,
    iconUrls: [],
    isFolder: true,
    children: [],
    path: "root/" + folderId,
  };

  const newFilesInformation: Array<IFile> = [];
  for (const fileKey in files) {
    if (isNaN(parseInt(fileKey))) continue;
    const currFile = files[parseInt(fileKey)];
    await processFolderUpload(
      currFile,
      newDirectory,
      newFilesInformation,
      fileIcons,
      folderIcons,
      "root/" + folderId
    );
  }
  self.postMessage({
    newDirectory,
    newFilesInformation,
  });
};

export {};
