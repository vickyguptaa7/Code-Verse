import {
  directoryComparator,
  findExtension,
  findIconUrl,
} from "../../../Store/reducres/SideDrawer/Directory/DirectoryOperations";
import IDirectory from "../../../Interface/directory.interface";
import { uniqueIdGenerator } from "../../../library/uuid/uuid.lib";
import { IFile } from "../../../Interface/file.interface";
import { supportedFileTypes } from "../../../Assets/Data/editorLanguages";
import { useAppSelector } from "../../../Store/store";

const useUpload = () => {
  const folderIcons = useAppSelector((state) => state.Directory.folderIcons);
  const fileIcons = useAppSelector((state) => state.Directory.fileIcons);
  const uniqueFileFolderNameGenerator = (
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

  const processFileUpload = async (
    file: File,
    externalDirectory: Array<IDirectory>,
    externalFilesInformation: Array<IFile>,
    isNameUnique = true,
    parentId = "root",
    dirPath: string
  ) => {
    if (!isFileQualifyForUpload(file.name)) return;
    const { name, id } = uniqueFileFolderNameGenerator(
      file.name,
      false,
      isNameUnique
    );
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
      iconUrls: findIconUrl(name, false, fileIcons),
      children: [],
      path: dirPath,
    };
    const fileInformation = {
      id: id,
      name,
      body: result as string,
      language: findExtension(name).extName,
      iconUrls: findIconUrl(name, false, fileIcons),
    };
    // add to the dummy external file that we are creating
    externalDirectory.push(fileForDirectory);
    externalFilesInformation.push(fileInformation);
  };

  const processFolderUpload = async (
    file: File,
    currentDirectory: IDirectory,
    tempFilesInformation: Array<IFile>,
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
          iconUrls: findIconUrl(currLocalPathName, true, folderIcons),
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
      tempFilesInformation,
      false,
      currentDirectory.id,
      dirPath
    );
  };

  const sortTheProcessedUploadedDirectory = (externalDirectory: IDirectory) => {
    for (const directory of externalDirectory.children) {
      sortTheProcessedUploadedDirectory(directory);
    }
    externalDirectory.children.sort(directoryComparator);
  };

  return {
    processFileUpload,
    uniqueFileFolderNameGenerator,
    processFolderUpload,
    sortTheProcessedUploadedDirectory,
  };
};

export default useUpload;
