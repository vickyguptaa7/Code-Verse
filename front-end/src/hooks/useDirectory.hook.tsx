import IDirectory from "../@types/directory.d";

const useDirectory = () => {
  /**
   * This function checks if a file or folder already exists in a given directory or its
   * subdirectories.
   * @param directories - An array of objects representing directories and files in a file system. Each
   * object has properties like id, name, isFolder, and children.
   * @param path - An array of strings representing the path to the directory where the file or folder
   * is to be added or renamed. Each string in the array represents the ID of a directory in the path
   * hierarchy.
   * @param {string} name - The name of the file or folder that needs to be checked for existence in
   * the given directory path.
   * @param {boolean} [isRenameCheck=false] - isRenameCheck is a boolean parameter that is used to
   * indicate whether the function is being called to check for the existence of a file/folder during a
   * rename operation or during an add operation. If it is true, then the path parameter will be one
   * more than the actual path because we have the location
   * @param {number} [indx=1] - indx is a parameter that represents the current index of the path array
   * being checked in the recursive function. It is used to traverse the directory tree and check if
   * the file or folder already exists in the given path.
   * @returns a boolean value indicating whether a file or folder with the given name already exists in
   * the specified directory path.
   */
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

  /**
   * The function finds a directory within a directory tree given a path.
   * @param {IDirectory} directory - The root directory or a subdirectory of type IDirectory that we want
   * to search for a specific directory within.
   * @param directoryPath - An array of strings representing the path to the target directory. Each
   * element in the array represents a directory name in the path, starting from the root directory. For
   * example, if the target directory is located at "/root/folder/subfolder", then directoryPath would be
   * ["root", "folder", "
   * @param {number} [indx=1] - indx is a parameter that keeps track of the current index of the
   * directory path array that is being traversed. It is initialized to 1 because the first element of
   * the path is the root directory, which is already passed as the first parameter to the function. The
   * indx parameter is incremented by 1
   * @returns The function `findDirectory` returns an `IDirectory` object if the target directory is
   * found in the directory tree, otherwise it returns `null`.
   */
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

  /**
   * The function recursively searches for a target directory in a given directory structure and returns
   * its path.
   * @param {IDirectory} directory - The root directory object from which the search for the target
   * directory will begin.
   * @param directoryPath - directoryPath is an array of strings that represents the path to the target
   * directory. Each string in the array represents the id of a directory in the path. The first element
   * of the array is the id of the root directory.
   * @param {number} [indx=1] - indx is a parameter that keeps track of the current index of the
   * directory path being searched. It starts at 1 because the first element of the path is the root
   * directory. As the function recursively searches through the directory tree, indx is incremented to
   * move to the next element in the directory path.
   * @param {string} [directoryPathWithName] - The parameter `directoryPathWithName` is a string that
   * represents the path of the parent directories leading up to the current directory being searched.
   * It is used to keep track of the path as the function recursively searches for the target directory.
   * It is initialized as an empty string in the function call and is updated
   * @returns The function `findDirectoryPath` returns a string that represents the path of the target
   * directory if it is found in the given directory tree, or it returns the string "path not found" if
   * the target directory is not found.
   */
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
