import directory from "../Interface/directory.interface";

const useDirectory = () => {
  const isFileOrFolderAlreadyExists = (
    directories: Array<directory>,
    parentId: string,
    name: string
  ) => {
    for (const directory of directories) {
      if (
        (directory.parentId === parentId &&
          directory.name.toLowerCase() === name.toLowerCase()) ||
        (directory.isFolder &&
          isFileOrFolderAlreadyExists(directory.children, parentId, name))
      ) {
        return true;
      }
    }
    return false;
  };

  return {
    isFileOrFolderAlreadyExists,
  };
};

export default useDirectory;
