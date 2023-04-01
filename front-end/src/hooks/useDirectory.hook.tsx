import IDirectory from "../Interface/directory.interface";

const useDirectory = () => {
  const isFileOrFolderAlreadyExists = (
    directories: Array<IDirectory>,
    path: Array<string>,
    name: string,
    isRenameCheck: boolean = false,
    indx: number = 1
  ) => {
    console.log("Path : ", path);
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

  return {
    isFileOrFolderAlreadyExists,
    findDirectory,
    findDirectoryPath,
  };
};

export default useDirectory;
