import IDirectory from "../Interface/directory.interface";
import { IFile } from "../Interface/file.interface";
import {
  directoryComparator,
  findExtension,
  findIconUrl,
} from "../Store/reducres/SideDrawer/Directory/DirectoryOperations";
import { useAppSelector } from "../Store/store";
import { uniqueIdGenerator } from "../library/uuid/uuid.lib";

const useDirectory = () => {
  const folderIcons = useAppSelector((state) => state.Directory.folderIcons);
  const fileIcons = useAppSelector((state) => state.Directory.fileIcons);

  const isFileOrFolderAlreadyExists = (
    directories: Array<IDirectory>,
    path: Array<string>,
    name: string,
    isRenameCheck: boolean = false,
    indx: number = 1
  ) => {
    console.log("Path : ", path);
    const baseCheck=(isRenameCheck)?indx+1:indx;
    if (path.length === baseCheck) {
      const targetIndx = directories.findIndex(
        (directory) =>
          directory.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      return targetIndx !== -1;
    }
    const childIndx = directories.findIndex(
      (directory) => directory.id === path[indx]
    );
    if (childIndx === -1) return false;
    if (
      directories[childIndx].isFolder &&
      isFileOrFolderAlreadyExists(
        directories[childIndx].children,
        path,
        name,
        isRenameCheck,
        indx + 1
      )
    )
      return true;

    return false;
  };

  const findDirectory = (
    directories: Array<IDirectory>,
    directoryId: string
  ) => {
    let dir: IDirectory;
    for (const directory of directories) {
      if (directory.isFolder) {
        if (directoryId === directory.id) return directory;
        dir = findDirectory(directory.children, directoryId);
        if (dir) return dir;
      }
    }
    return {} as IDirectory;
  };

  const findDirectoryPath = (
    directories: Array<IDirectory>,
    directoryId: string,
    directoryPath: string
  ) => {
    let path = "";
    for (const directory of directories) {
      if (directory.isFolder) {
        if (directory.id === directoryId)
          return directoryPath + "/" + directory.name;
        path = findDirectoryPath(
          directory.children,
          directoryId,
          directoryPath + "/" + directory.name
        );
        if (path.length > 0) return path;
      }
    }
    return path;
  };

  const uniqueFileFolderNameGenerator = (
    name: string,
    isFolder: boolean,
    isNameUnqique: boolean
  ) => {
    const fileName = name.split("\\").pop()?.split(".");
    const id: string = uniqueIdGenerator();
    if (isFolder)
      return {
        name: fileName ? fileName.join(".") + "." + id : id,
        id,
      };
    const extension = fileName ? fileName.pop() : "";
    if (isNameUnqique) fileName?.push(id);
    fileName?.push(extension ? extension : "");
    const newFileName = fileName ? fileName.join(".") : id;
    return { name: newFileName, id };
  };

  const processFileUpload = async (
    file: File,
    externalDirectory: Array<IDirectory>,
    externalFilesInformation: Array<IFile>,
    isNameUnqique = true,
    parentId = "root",
    dirPath: string
  ) => {
    const { name, id } = uniqueFileFolderNameGenerator(
      file.name,
      false,
      isNameUnqique
    );
    if (parentId === "root") {
      dirPath = id;
    } else {
      dirPath += "/" + id;
    }
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

  const sortTheProcessedDirectory = (externalDirectory: IDirectory) => {
    for (const directory of externalDirectory.children) {
      sortTheProcessedDirectory(directory);
    }
    externalDirectory.children.sort(directoryComparator);
  };

  return {
    isFileOrFolderAlreadyExists,
    findDirectory,
    processFileUpload,
    uniqueFileFolderNameGenerator,
    processFolderUpload,
    findDirectoryPath,
    sortTheProcessedDirectory,
  };
};

export default useDirectory;
