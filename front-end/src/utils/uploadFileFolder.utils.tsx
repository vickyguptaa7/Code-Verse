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

const processFileUpload = async (
  file: File,
  externalDirectory: Array<IDirectory>,
  externalFilesInformation: Array<IFile>,
  fileIcons: IIcon,
  isNameUnique = true,
  parentId = "root",
  dirPath: string
) => {
  if (!isFileQualifyForUpload(file.name)) return;
  const { name, id } = findUniqueFileFolderName(file.name, false, isNameUnique);
  dirPath += "/" + id;
  const reader = new FileReader();
  reader.readAsText(file);
  const result = await new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result?.toString());
    };
    reader.onerror = () => {
      console.log("Error while loading file : ", reader.error);
      reject(reader.error);
    };
  });

  const fileForDirectory = {
    id,
    parentId,
    name,
    isFolder: false,
    iconUrls: findFileFolderIconUrl(name, false, fileIcons),
    children: [],
    path: dirPath,
  };
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

const processFolderUpload = async (
  file: File,
  currentDirectory: IDirectory,
  newFilesInformation: Array<IFile>,
  fileIcons: IIcon,
  folderIcons: IIcon,
  dirPath: string
) => {
  const localPath = file.webkitRelativePath.split("/");
  let localPathIndx = 1;
  for (localPathIndx; localPathIndx < localPath.length - 1; localPathIndx++) {
    const currLocalPathName = localPath[localPathIndx];
    const targetIndx = currentDirectory.children.findIndex(
      (dir) => dir.name.toLowerCase() === currLocalPathName.toLowerCase()
    );
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
