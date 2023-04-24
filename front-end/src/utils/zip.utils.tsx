import JSZip from "jszip";
import IDirectory from "../Interface/directory.interface";
import { IFilesInforation } from "../Interface/file.interface";

// add all the files and folder to the zip
export const addAllFilesAndFolderToZipHelper = async (
  zip: JSZip,
  directories: Array<IDirectory>,
  dirPath: string,
  filesInformation: IFilesInforation
) => {
  //if the directory is a folder then recursively call the function to add all the files and folder to the zip
  for (const directory of directories) {
    if (directory.isFolder) {
      await addAllFilesAndFolderToZipHelper(
        zip,
        directory.children,
        dirPath + "/" + directory.name,
        filesInformation
      );
    } else {
      zip.file(
        dirPath + "/" + directory.name,
        new Blob([filesInformation[directory.id].body])
      );
    }
  }
};
