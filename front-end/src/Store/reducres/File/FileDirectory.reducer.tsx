import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import directory from "../../../Interface/directory.interface";
// TODO:Central file state

let DUMMY_FILE_DIRECTORY = new Array<directory>();

const fileDirectoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
};

const fileDirectorySlice = createSlice({
  name: "file-directory",
  initialState: fileDirectoryInitialState,
  reducers: {
    addToDirectory(
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
    renameDirectoryFileOrFolder(
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
    deleteDirectoryFileOrFolder(state, action: PayloadAction<{ id: string }>) {
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
  },
});
export const {
  addToDirectory,
  renameDirectoryFileOrFolder,
  deleteDirectoryFileOrFolder,
} = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
