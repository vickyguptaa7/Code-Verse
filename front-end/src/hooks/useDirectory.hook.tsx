import directory from "../Interface/directory.interface";
import {
  addToDirectory,
  deleteDirectoryFileOrFolder,
  renameDirectoryFileOrFolder,
} from "../Store/reducres/File/FileDirectory.reducer";
import { useAppDispatch, useAppSelector } from "../Store/store";

const useDirectory = () => {
  const dispatch = useAppDispatch();
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );

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

  const addFileOrFolderToDirectory = (
    parentId: string,
    name: string,
    isFolder: boolean
  ) => {
    if (isFileOrFolderAlreadyExists(directories, parentId, name)) {
      console.log("File already exists!");
      return;
    }
    dispatch(
      addToDirectory({
        parentId,
        name,
        isFolder,
      })
    );
  };

  const renameFileOrFolderOfDirectory = (id: string, name: string) => {
    if (isFileOrFolderAlreadyExists(directories, id, name)) {
      console.log("File already exists!");
      return;
    }
    dispatch(renameDirectoryFileOrFolder({ id, name }));
  };

  const deleteFileOrFolderOfDirectory = (id: string) => {
    if (!id.trim().length) return;
    dispatch(deleteDirectoryFileOrFolder({ id }));
  };

  return {
    addFileOrFolderToDirectory,
    renameFileOrFolderOfDirectory,
    deleteFileOrFolderOfDirectory,
  };
};

export default useDirectory;
