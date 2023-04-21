import { supportedFileTypes } from "../Assets/Data/editorLanguages.data";
import IDirectory from "../Interface/directory.interface";
import { IFilesInforation, INavFile } from "../Interface/file.interface";
import { IIcon } from "../Interface/Icon.interface";
import { uniqueIdGenerator } from "../library/uuid/uuid.lib";

const fileDownloader = (file: Blob, name: string) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

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

const directoryComparator = (d1: IDirectory, d2: IDirectory) => {
  if (d1.isFolder && !d2.isFolder) return -1; // if d1 is folder then it must be above d2
  if (!d1.isFolder && d2.isFolder) return 1; // vice versa
  return d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1; // otherwise sort on the basis of the name
};

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

const isFileQualifyForUpload = (name: string) => {
  const arr = name.split(".");
  if (arr.length === 1) return true;
  return supportedFileTypes[arr[arr.length - 1]] ? true : false;
};

const sortDirectory = (directory: IDirectory) => {
  for (const childDir of directory.children) {
    sortDirectory(childDir);
  }
  directory.children.sort(directoryComparator);
};

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
