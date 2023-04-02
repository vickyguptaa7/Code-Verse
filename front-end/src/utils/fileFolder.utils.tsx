import IDirectory from "../Interface/directory.interface";
import { iconObject } from "../Interface/iconObject.interface";
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
  iconList: iconObject
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

const sortDirectory = (directory: IDirectory) => {
  for (const childDir of directory.children) {
    sortDirectory(childDir);
  }
  directory.children.sort(directoryComparator);
};

export {
  fileDownloader,
  findFileExtension,
  findFileFolderIconUrl,
  directoryComparator,
  findUniqueFileFolderName,
  sortDirectory,
};
