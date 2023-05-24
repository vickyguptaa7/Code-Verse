import { supportedFileTypes } from "../Assets/Data/editorLanguages.data";
import IDirectory from "../Interface/directory.interface";
import { IFilesInforation, INavFile } from "../Interface/file.interface";
import { IIcon } from "../Interface/Icon.interface";
import { uniqueIdGenerator } from "../library/uuid/uuid.lib";

/**
 * This function creates a downloadable link for a given file and downloads it with the specified name.
 * @param {Blob} file - The file parameter is a Blob object, which represents a file-like object of
 * immutable, raw data. It can be used to represent data in formats such as images, videos, audio, and
 * other binary data.
 * @param {string} name - The name parameter is a string that represents the desired name of the
 * downloaded file.
 */
const fileDownloader = (file: Blob, name: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

/**
 * This function takes a file name as input and returns the file extension and whether or not a dot is
 * present in the file name.
 * @param {string} name - The `name` parameter is a string representing the name of a file, including
 * its extension (if present).
 * @returns An object with two properties: `extName` which is a string representing the file extension
 * (if present), and `isDotPresent` which is a boolean indicating whether a dot (.) was found in the
 * input string.
 */
const findFileExtension = (name: string) => {
  let extension = "";
  let isDotPresent = false;
  for (let i = name.length - 1; i >= 0; i--) {
    if (name[i] === ".") {
      isDotPresent = true;
      break;
    }
    extension += name[i];
  }
  extension = extension.split("").reverse().join("");
  return { extName: extension, isDotPresent };
};

/**
 * This function takes in a file or folder name, a boolean indicating if it's a folder, and an icon
 * list, and returns the corresponding icon URLs for the file or folder.
 * @param {string} name - a string representing the name of a file or folder
 * @param {boolean} isFolder - A boolean value indicating whether the file is a folder or not. If it is
 * a folder, the function will return an array of two icon URLs for the closed and open folder icons.
 * If it is not a folder, the function will return an array with a single icon URL for the file
 * extension.
 * @param {IIcon} iconList - an object containing key-value pairs where the key is a string
 * representing the name of an icon and the value is the URL of the icon image. This function uses this
 * object to find the URL of the icon for a given file or folder name.
 * @returns An array of icon URLs is being returned. If the input represents a folder, the array
 * contains two URLs for the closed and open folder icons. If the input represents a file, the array
 * contains a single URL for the icon associated with the file extension. If the input does not match
 * any known folder or file extension, an empty array is returned.
 */
const findFileFolderIconUrl = (
  name: string,
  isFolder: boolean,
  iconList: IIcon
) => {
  name = name.toLowerCase();
  if (isFolder) {
    if (
      !iconList.hasOwnProperty("folder-" + name) ||
      !iconList.hasOwnProperty("folder-" + name + "-open")
    ) {
      return [];
    }
    return [iconList["folder-" + name], iconList["folder-" + name + "-open"]];
  }
  const extensionInfo = findFileExtension(name);
  if (
    !extensionInfo.isDotPresent ||
    !iconList.hasOwnProperty(extensionInfo.extName)
  ) {
    return [];
  }
  return [iconList[extensionInfo.extName]];
};

/**
 * The function sorts an array of directories by placing folders above files and then sorting them
 * alphabetically by name.
 * @param {IDirectory} d1 - IDirectory type object representing the first directory to be compared.
 * @param {IDirectory} d2 - d2 is a parameter of type IDirectory, which is being used in the
 * directoryComparator function to compare two directories based on their properties such as whether
 * they are folders or not, and their names.
 * @returns A function that takes two arguments of type `IDirectory` and returns a number indicating
 * the order in which they should be sorted. The function first checks if one directory is a folder and
 * the other is not, and returns -1 or 1 accordingly. If both directories are folders or both are not
 * folders, the function sorts them based on their names in alphabetical order.
 */
const directoryComparator = (d1: IDirectory, d2: IDirectory) => {
  if (d1.isFolder && !d2.isFolder) return -1; // if d1 is folder then it must be above d2
  if (!d1.isFolder && d2.isFolder) return 1; // vice versa
  return d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1; // otherwise sort on the basis of the name
};

/**
 * The function generates a unique file or folder name with an optional unique identifier.
 * @param {string} name - The original name of the file or folder, including its path.
 * @param {boolean} isFolder - The `isFolder` parameter is a boolean value that indicates whether the
 * file or folder being named is a folder or not. If it is a folder, the function will generate a
 * unique ID and append it to the folder name. If it is not a folder, the function will append the
 * unique ID
 * @param {boolean} isNameUnique - The `isNameUnique` parameter is a boolean value that indicates
 * whether the file or folder name should be unique or not. If it is `true`, a unique identifier will
 * be appended to the end of the name to ensure uniqueness. If it is `false`, the original name will be
 * returned without
 * @returns An object with two properties: "name" and "id". The value of "name" is a string
 * representing the unique file or folder name, and the value of "id" is a string representing the
 * unique identifier used to generate the name.
 */
const findUniqueFileFolderName = (
  name: string,
  isFolder: boolean,
  isNameUnique: boolean
) => {
  const fileName = name.split("\\").pop()?.split(".");
  const id: string = uniqueIdGenerator();
  if (isFolder)
    return {
      name: fileName ? fileName.join(".") + "." + id : id,
      id,
    };
  const extension = fileName ? fileName.pop() : "";
  if (isNameUnique) fileName?.push(id);
  fileName?.push(extension ? extension : "");
  const newFileName = fileName ? fileName.join(".") : id;
  return { name: newFileName, id };
};

/**
 * This function checks if a file's extension is supported for upload.
 * @param {string} name - A string representing the name of a file.
 * @returns A boolean value is being returned.
 */
const isFileQualifyForUpload = (name: string) => {
  const arr = name.split(".");
  if (arr.length === 1) return true;
  return supportedFileTypes[arr[arr.length - 1]] ? true : false;
};

/**
 * The function recursively sorts the children of a directory object using a comparator function.
 * @param {IDirectory} directory - IDirectory is likely an interface or type definition for a directory
 * object that contains information about a directory and its children. The `sortDirectory` function
 * recursively sorts the children of the directory object using the `directoryComparator` function.
 */
const sortDirectory = (directory: IDirectory) => {
  for (const childDir of directory.children) {
    sortDirectory(childDir);
  }
  directory.children.sort(directoryComparator);
};

/**
 * This function replaces a searched text with a new text in the body of specified files and returns
 * the updated files information.
 * @param {IFilesInforation} filesInformation - an object containing information about all the files in
 * the project, where the keys are file IDs and the values are objects containing the file's metadata
 * and body.
 * @param targetFiles - An array of objects representing the files in which the text needs to be
 * replaced. Each object should have an "id" property that uniquely identifies the file.
 * @param {string} searchedText - The text that you want to search for in the target files.
 * @param {string} replacedText - The parameter `replacedText` is a string that represents the text
 * that will replace the `searchedText` in the target files.
 * @returns an array of objects containing the updated file information, where each object has an `id`
 * property representing the file ID and a `body` property representing the updated file content.
 */
function replaceTextInFiles(
  filesInformation: IFilesInforation,
  targetFiles: Array<INavFile>,
  searchedText: string,
  replacedText: string
) {
  const updatedFilesInfo = [];
  for (const file of targetFiles) {
    if (filesInformation[file.id] === undefined) continue;
    const newString = filesInformation[file.id].body.replaceAll(
      new RegExp(searchedText, "ig"),
      replacedText
    );
    updatedFilesInfo.push({ id: file.id, body: newString });
  }
  return updatedFilesInfo;
}

/**
 * This function searches for files in a given object that contain a specific text and returns an array
 * of matching files.
 * @param {IFilesInforation} filesInformation - an object containing information about files, where
 * each key is a file ID and the value is an object with properties such as "id" (string) and "body"
 * (string).
 * @param {string} searchedText - The text that is being searched for in the files.
 * @returns an array of objects that contain the id and type of files that match the searched text.
 */
function findMatchingFiles(
  filesInformation: IFilesInforation,
  searchedText: string
) {
  const matchingFiles = [];
  for (const key in filesInformation) {
    const file = filesInformation[key];
    if (file.id === "settings" || file.id === "extension") continue;
    if (file.body.toLowerCase().includes(searchedText.toLowerCase())) {
      matchingFiles.push({ id: file.id, type: "file" });
    }
  }
  return matchingFiles;
}

export {
  fileDownloader,
  findFileExtension,
  findFileFolderIconUrl,
  directoryComparator,
  findUniqueFileFolderName,
  sortDirectory,
  isFileQualifyForUpload,
  replaceTextInFiles,
  findMatchingFiles,
};
