/* eslint-disable no-restricted-globals */
import IDirectory from "../Interface/directory.interface";
import { IFile } from "../Interface/file.interface";
import { findUniqueFileFolderName } from "../utils/fileFolder.utils";
import { processFolderUpload } from "../utils/uploadFileFolder.utils";

self.onmessage = async (e) => {
    const { files,folderIcons,fileIcons } = e.data;

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
        newFilesInformation
    });
};

export { };