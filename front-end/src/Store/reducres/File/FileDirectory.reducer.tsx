import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import directory from "../../../Interface/directory.interface";
// TODO:Central file state

interface iconObject {
  [key: string]: string;
}

let DUMMY_FILE_DIRECTORY = new Array<directory>();

const fileDirectoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
  fileIcons: {} as iconObject,
  folderIcons: {} as iconObject,
};

const findIconUrl = (name: string, isFolder: boolean, iconList: iconObject) => {
  if (isFolder) {
    if (
      !iconList.hasOwnProperty("folder-" + name) ||
      !iconList.hasOwnProperty("folder-" + name + "-open")
    ) {
      return [];
    }
    return [iconList["folder-" + name], iconList["folder-" + name + "-open"]];
  }
  let extension = "";
  let isDotPresent = false;
  for (let i = name.length - 1; i >= 0; i--) {
    if (name[i] === ".") {
      isDotPresent = true;
      break;
    }
    extension += name[i];
  }
  extension = extension.split("").reverse().join("");
  if (!isDotPresent || !iconList.hasOwnProperty(extension)) {
    return [];
  }
  return [iconList[extension]];
};

const fileDirectorySlice = createSlice({
  name: "file-directory",
  initialState: fileDirectoryInitialState,
  reducers: {
    addFileOrFolderToDirectory(
      state,
      action: PayloadAction<{
        parentId: string;
        name: string;
        isFolder: boolean;
      }>
    ) {
      if (action.payload.parentId === "root") {
        const id = new Date().getTime().toString();
        state.directories.unshift({
          id: id,
          parentId: action.payload.parentId,
          name: action.payload.name,
          iconsUrl: findIconUrl(
            action.payload.name,
            action.payload.isFolder,
            action.payload.isFolder ? state.folderIcons : state.fileIcons
          ),
          isFolder: action.payload.isFolder,
          children: [],
        });
        return;
      }
      const add = (
        directories: Array<directory>,
        parentId: string,
        name: string,
        isFolder: boolean
      ) => {
        for (const directory of directories) {
          if (directory.isFolder && directory.id === parentId) {
            const id = new Date().getTime().toString();
            directory.children.unshift({
              id: id,
              name,
              isFolder,
              iconsUrl: findIconUrl(
                action.payload.name,
                action.payload.isFolder,
                action.payload.isFolder ? state.folderIcons : state.fileIcons
              ),
              children: [],
              parentId: directory.id,
            });
            return;
          }
          if (directory.isFolder)
            add(directory.children, parentId, name, isFolder);
        }
        return;
      };
      add(
        state.directories,
        action.payload.parentId,
        action.payload.name,
        action.payload.isFolder
      );
    },
    renameFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const rename = (
        directories: Array<directory>,
        id: string,
        name: string
      ) => {
        for (const directoryIndx in directories) {
          if (directories[directoryIndx].id === id) {
            directories[directoryIndx] = {
              ...directories[directoryIndx],
              name: name,
              iconsUrl: findIconUrl(
                action.payload.name,
                directories[directoryIndx].isFolder,
                directories[directoryIndx].isFolder
                  ? state.folderIcons
                  : state.fileIcons
              ),
            };
            return;
          }
          if (directories[directoryIndx].isFolder) {
            rename(directories[directoryIndx].children, id, name);
          }
        }
      };
      rename(state.directories, action.payload.id, action.payload.name);
    },
    deleteFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      const deleteFileOrFolder = (
        directories: Array<directory>,
        id: string
      ) => {
        for (const directoryIndx in directories) {
          if (directories[directoryIndx].id === id) {
            directories.splice(parseInt(directoryIndx), 1);
            return;
          }
          if (directories[directoryIndx].isFolder) {
            deleteFileOrFolder(directories[directoryIndx].children, id);
          }
        }
      };
      deleteFileOrFolder(state.directories, action.payload.id);
    },
    setFileIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.fileIcons = { ...action.payload };
    },
    setFolderIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.folderIcons = { ...action.payload };
    },
  },
});
export const {
  addFileOrFolderToDirectory,
  renameFileOrFolderOfDirectory,
  deleteFileOrFolderOfDirectory,
  setFileIcons,
  setFolderIcons,
} = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
