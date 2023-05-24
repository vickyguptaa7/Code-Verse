import { IIcon } from "../Interface/Icon.interface";
import IDirectory from "../Interface/directory.interface";
import { IFile } from "../Interface/file.interface";
import { uniqueIdGenerator } from "../library/uuid/uuid.lib";
import {
  findFileExtension,
  findFileFolderIconUrl,
  findUniqueFileFolderName,
  isFileQualifyForUpload,
} from "./fileFolder.utils";

/**
 * This function processes a file upload by generating a unique name for the file, reading the file,
 * creating a file for the directory, and creating file information.
 * @param {File} file - The file that needs to be uploaded.
 * @param externalDirectory - An array of objects representing the directory structure of the files
 * being uploaded. Each object contains properties such as id, parentId, name, isFolder, iconUrls,
 * children, and path.
 * @param externalFilesInformation - An array of objects representing information about files that have
 * been uploaded. Each object contains an id, name, body (file content), language, and iconUrls.
 * @param {IIcon} fileIcons - an object containing URLs for icons used to represent different file
 * types.
 * @param [isNameUnique=true] - A boolean value indicating whether the file name should be unique or
 * not. If set to true, a unique name will be generated for the file. If set to false, the original
 * file name will be used.
 * @param [parentId=root] - The ID of the parent directory where the file will be uploaded. If not
 * specified, it will be uploaded to the root directory.
 * @param {string} dirPath - A string representing the path of the directory where the file will be
 * uploaded. It is used to create the path of the file and to update the path of the directory after
 * the file is uploaded.
 * @returns Nothing is being returned explicitly in this function. However, it is an asynchronous
 * function that returns a promise that resolves to undefined.
 */
const processFileUpload = async (
  file: File,
  externalDirectory: Array<IDirectory>,
  externalFilesInformation: Array<IFile>,
  fileIcons: IIcon,
  isNameUnique = true,
  parentId = "root",
  dirPath: string
) => {
  // check if the file is qualify for upload or not
  if (!isFileQualifyForUpload(file.name)) return;

  // generate the unique name for the file
  const { name, id } = findUniqueFileFolderName(file.name, false, isNameUnique);

  // add the file id to the directory path
  dirPath += "/" + id;

  // read the file and get the result
  const reader = new FileReader();
  reader.readAsText(file);
  const result = await new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result?.toString());
    };
    reader.onerror = () => {
      console.error("Error while loading file : ", reader.error);
      reject(reader.error);
    };
  });

  // create the file for the directory
  const fileForDirectory = {
    id,
    parentId,
    name,
    isFolder: false,
    iconUrls: findFileFolderIconUrl(name, false, fileIcons),
    children: [],
    path: dirPath,
  };

  // create the file information
  const fileInformation = {
    id: id,
    name,
    body: result as string,
    language: findFileExtension(name).extName,
    iconUrls: findFileFolderIconUrl(name, false, fileIcons),
  };
  // add to the dummy external file that we are creating
  externalDirectory.push(fileForDirectory);
  externalFilesInformation.push(fileInformation);
};

/**
 * The function processes a file upload by creating any necessary parent folders and then calling
 * another function to process the file.
 * @param {File} file - The file that needs to be uploaded to the directory.
 * @param {IDirectory} currentDirectory - currentDirectory is an object representing the current
 * directory in which the file is being uploaded. It contains information such as the directory's ID,
 * name, parent ID, icon URLs, whether it is a folder or not, its children (if it is a folder), and its
 * path.
 * @param newFilesInformation - An array of objects containing information about newly uploaded files.
 * This array is updated as new files are uploaded.
 * @param {IIcon} fileIcons - an object containing URLs for different file type icons
 * @param {IIcon} folderIcons - an object containing URLs for different folder icons
 * @param {string} dirPath - dirPath is a string representing the current directory path. It is used to
 * keep track of the path while creating new folders and uploading files.
 */
const processFolderUpload = async (
  file: File,
  currentDirectory: IDirectory,
  newFilesInformation: Array<IFile>,
  fileIcons: IIcon,
  folderIcons: IIcon,
  dirPath: string
) => {
  // get the relative path of the file and split it to get the folder names and in the end the file name
  const localPath = file.webkitRelativePath.split("/");

  // localPathIndx is 1 bcoz the first folder name was generated earlier with unqieue name
  let localPathIndx = 1;

  // iterate to path length - 1 bcoz the last element of the path is the file
  // we first create all parent folder required to get the file if folder already not exists
  for (localPathIndx; localPathIndx < localPath.length - 1; localPathIndx++) {
    // get the current folder name
    const currLocalPathName = localPath[localPathIndx];

    // find the index of the folder in the current directory
    const targetIndx = currentDirectory.children.findIndex(
      (dir) => dir.name.toLowerCase() === currLocalPathName.toLowerCase()
    );

    // if the folder not exists then create it
    // else move to the folder
    if (targetIndx === -1) {
      const uniqueId = uniqueIdGenerator();
      dirPath += "/" + uniqueId;
      currentDirectory.children.push({
        id: uniqueId,
        parentId: currentDirectory.id,
        name: currLocalPathName,
        iconUrls: findFileFolderIconUrl(currLocalPathName, true, folderIcons),
        isFolder: true,
        children: [],
        path: dirPath,
      });
      currentDirectory =
        currentDirectory.children[currentDirectory.children.length - 1];
    } else {
      dirPath += "/" + currentDirectory.children[targetIndx].id;
      currentDirectory = currentDirectory.children[targetIndx];
    }
  }

  // at last we have the file so we can process it
  await processFileUpload(
    file,
    currentDirectory.children,
    newFilesInformation,
    fileIcons,
    false,
    currentDirectory.id,
    dirPath
  );
};

export { processFileUpload, processFolderUpload };
