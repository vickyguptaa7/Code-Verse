import IDirectory from "../Interface/directory.interface";

const useDirectory = () => {
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

  return {
    isFileOrFolderAlreadyExists,folderContent
  };
};

export default useDirectory;
