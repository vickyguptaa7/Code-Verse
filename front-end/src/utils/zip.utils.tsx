import JSZip from "jszip";
import IDirectory from "../Interface/directory.interface";
import { IFilesInforation } from "../Interface/file.interface";

/**
 * This function recursively adds all files and folders to a JSZip object, given an array of
 * directories and file information.
 * @param {JSZip} zip - JSZip object that represents the zip file being created
 * @param directories - An array of objects representing directories and files within a directory. Each
 * object has properties such as "name", "isFolder", and "children" (if it is a folder).
 * @param {string} dirPath - dirPath is a string representing the path of the current directory being
 * processed. It is used to create the correct file path when adding files to the zip.
 * @param {IFilesInforation} filesInformation - An object containing information about the files to be
 * added to the zip. The keys of the object are the IDs of the files and the values are objects
 * containing the body of the file as a Blob.
 */
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
