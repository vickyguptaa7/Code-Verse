import IDirectory from "../Interface/directory.interface";

const useDirectory = () => {
  const isFileOrFolderAlreadyExists = (
    directories: Array<IDirectory>,
    path: Array<string>,
    name: string,
    isRenameCheck: boolean = false,
    indx: number = 1
  ) => {
    /* 
    if isRenameCheck is true then we the path will be one more than the actual path bcoz we have the location where renaming is done 
    but in case of adding file the path will of parent node where we have to add the file
    */
    // adjust the indx according to the isRenameCheck or addFile
    const baseCheck = isRenameCheck ? indx + 1 : indx;

    // check if the same name file or folder already exists in the same directory as base case hits
    if (path.length === baseCheck) {
      const targetIndx = directories.findIndex(
        (directory) =>
          directory.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
      // if the target index is not -1 then the file or folder already exists
      return targetIndx !== -1;
    }

    // get the child directory index from the parent directory
    const childIndx = directories.findIndex(
      (directory) => directory.id === path[indx]
    );

    // if the child directory is not found then return false
    if (childIndx === -1) return false;

    // if the child directory is a folder then recursively call the function to check if the file or folder already exists in the child directory
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

    // if the child directory is not a folder then return false
    return false;
  };

  // this function will return the target directory
  const findDirectory = (
    directory: IDirectory,
    directoryPath: Array<string>,
    indx: number = 1
  ): IDirectory | null => {
    // indx is 1 bcoz the first element of the path is the root directory

    // if the indx is equal to the length of the path then we have reached the target directory
    if (directoryPath.length === indx) {
      return directory;
    }

    // get the child directory index from the parent directory
    const childIndx = directory.children.findIndex(
      (childDirectory) => childDirectory.id === directoryPath[indx]
    );

    // if the child directory is not found then return null
    if (childIndx === -1) return null;

    // if the child directory is a folder then recursively call the function to find the target directory
    if (directory.children[childIndx].isFolder) {
      const result: IDirectory | null = findDirectory(
        directory.children[childIndx],
        directoryPath,
        indx + 1
      );
      return result;
    }

    // if no found then return null
    return null;
  };

  // this function will return the path of the target directory
  const findDirectoryPath = (
    directory: IDirectory,
    directoryPath: Array<string>,
    indx: number = 1,
    directoryPathWithName: string = ""
  ): string => {
    // indx is 1 bcoz the first element of the path is the root directory

    // if the indx is equal to the length of the path then we have reached the target directory
    if (directoryPath.length === indx) {
      return directoryPathWithName + "/" + directory.name;
    }

    // get the child directory index from the parent directory
    const childIndx = directory.children.findIndex(
      (childDirectory) => childDirectory.id === directoryPath[indx]
    );

    // if the child directory is not found then return null
    if (childIndx === -1) return "path not found";

    // if the child directory is a folder then recursively call the function to find the target directory
    if (directory.children[childIndx].isFolder) {
      return findDirectoryPath(
        directory.children[childIndx],
        directoryPath,
        indx + 1,
        directoryPathWithName + "/" + directory.name
      );
    }

    // if no found then return path not found
    return "path not found";
  };

  return {
    isFileOrFolderAlreadyExists,
    findDirectory,
    findDirectoryPath,
  };
};

export default useDirectory;
