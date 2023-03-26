import { uuidv4 } from "@firebase/util";
import IDirectory from "../Interface/directory.interface";
import { IFile } from "../Interface/file.interface";
import {
  directoryComparator,
  findExtension,
  findIconUrl,
} from "../Store/reducres/SideDrawer/Directory/DirectoryOperations";
import { useAppSelector } from "../Store/store";

const useDirectory = () => {
  const folderIcons = useAppSelector((state) => state.Directory.folderIcons);
  const fileIcons = useAppSelector((state) => state.Directory.fileIcons);

  const isFileOrFolderAlreadyExists = (
    directories: Array<IDirectory>,
    parentId: string,
    name: string
  ) => {
    for (const directory of directories) {
      if (
        (directory.parentId === parentId &&
          directory.name.toLowerCase() === name.trim().toLowerCase()) ||
        (directory.isFolder &&
          isFileOrFolderAlreadyExists(directory.children, parentId, name))
      ) {
        return true;
      }
    }
    return false;
  };

  const folderContent = (
    directories: Array<IDirectory>,
    folderName: string
  ) => {
    let children: Array<IDirectory> = [];
    for (const directory of directories) {
      if (directory.isFolder && directory.name === folderName) {
        return directory.children;
      } else {
        children = folderContent(directory.children, folderName);
        if (children.length > 0) return children;
      }
    }
    return [] as Array<IDirectory>;
  };

  const uniqueFileFolderNameGenerator = (
    name: string,
    isFolder: boolean,
    isNameUnqique: boolean
  ) => {
    const fileName = name.split("\\").pop()?.split(".");
    const id: string = uuidv4();
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

  const externalFileGenerator = async (
    file: File,
    externalDirectory: Array<IDirectory>,
    externalFilesInformation: Array<IFile>,
    isNameUnqique = true
  ) => {
    const { name, id } = uniqueFileFolderNameGenerator(
      file.name,
      false,
      isNameUnqique
    );
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
      parentId: "root",
      name,
      isFolder: false,
      iconUrls: findIconUrl(name, false, fileIcons),
      children: [],
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

  const externalFolderGenerator = async (
    file: File,
    currentDirectory: IDirectory,
    tempFilesInformation: Array<IFile>
  ) => {
    const path = file.webkitRelativePath.split("/");
    let pathIndx = 1;
    for (pathIndx; pathIndx < path.length - 1; pathIndx++) {
      const currPathName = path[pathIndx];
      const targetIndx = currentDirectory.children.findIndex(
        (dir) => dir.name.toLowerCase() === currPathName.toLowerCase()
      );
      if (targetIndx === -1) {
        currentDirectory.children.push({
          id: uuidv4(),
          parentId: currentDirectory.id,
          name: currPathName,
          iconUrls: findIconUrl(currPathName, true, folderIcons),
          isFolder: true,
          children: [],
        });
        currentDirectory =
          currentDirectory.children[currentDirectory.children.length - 1];
      } else {
        currentDirectory = currentDirectory.children[targetIndx];
      }
    }
    await externalFileGenerator(
      file,
      currentDirectory.children,
      tempFilesInformation,false
    );
  };

  const sortTheExternalDirectory = (externalDirectory: IDirectory) => {
    for (const directory of externalDirectory.children) {
      sortTheExternalDirectory(directory);
    }
    externalDirectory.children.sort(directoryComparator);
  };

  return {
    isFileOrFolderAlreadyExists,
    folderContent,
    externalFileGenerator,
    uniqueFileFolderNameGenerator,
    externalFolderGenerator,
    sortTheExternalDirectory,
  };
};

export default useDirectory;
