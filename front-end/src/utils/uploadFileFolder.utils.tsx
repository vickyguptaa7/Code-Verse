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
      console.log("Error while loading file : ", reader.error);
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
  console.log("localPath : ", localPath);

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
