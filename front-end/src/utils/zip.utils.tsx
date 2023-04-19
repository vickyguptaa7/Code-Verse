import JSZip from "jszip";
import IDirectory from "../Interface/directory.interface";
import { IFilesInforation } from "../Interface/file.interface";

export const addAllFilesAndFolderToZipHelper = async (
  zip: JSZip,
  directories: Array<IDirectory>,
  dirPath: string,
  filesInformation: IFilesInforation
) => {
  for (const directory of directories) {
    if (directory.isFolder) {
      await addAllFilesAndFolderToZipHelper(
        zip,
        directory.children,
        dirPath + "/" + directory.name,
        filesInformation
      );
    } else {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          zip.file(
            dirPath + "/" + directory.name,
            new Blob([filesInformation[directory.id].body])
          );
          resolve("done");
        }, 0);
      });
    }
  }
};
