import IDirectory from "../Interface/directory.interface";

const useDirectory = () => {
  const isFileOrFolderAlreadyExists = (
    directories: Array<IDirectory>,
    path: Array<string>,
    name: string,
    isRenameCheck: boolean = false,
    indx: number = 1
  ) => {
    const baseCheck = isRenameCheck ? indx + 1 : indx;
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
    directory: IDirectory,
    directoryPath: Array<string>,
    indx: number = 1
  ): IDirectory | null => {
    if (directoryPath.length === indx) {
      return directory;
    }
    const childIndx = directory.children.findIndex(
      (childDirectory) => childDirectory.id === directoryPath[indx]
    );
    if (childIndx === -1) return null;
    if (directory.children[childIndx].isFolder) {
      const result: IDirectory | null = findDirectory(
        directory.children[childIndx],
        directoryPath,
        indx + 1
      );
      return result;
    }
    return null;
  };

  const findDirectoryPath = (
    directory: IDirectory,
    directoryPath: Array<string>,
    indx: number = 1,
    directoryPathWithName: string = ""
  ): string => {
    if (directoryPath.length === indx) {
      return directoryPathWithName+"/"+directory.name;
    }
    const childIndx = directory.children.findIndex(
      (childDirectory) => childDirectory.id === directoryPath[indx]
    );
    if (childIndx === -1) return "path not found";
    if (directory.children[childIndx].isFolder) {
      return findDirectoryPath(
        directory.children[childIndx],
        directoryPath,
        indx + 1,
        directoryPathWithName + "/" + directory.name
      );
    }
    return "path not found";
  };

  return {
    isFileOrFolderAlreadyExists,
    findDirectory,
    findDirectoryPath,
  };
};

export default useDirectory;
