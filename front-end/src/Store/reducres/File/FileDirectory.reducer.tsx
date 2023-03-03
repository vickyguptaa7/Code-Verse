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
            return directories;
          }
          if (directory.isFolder)
            add(directory.children, parentId, name, isFolder);
        }
        return [...directories];
      };
      add(
        state.directories,
        action.payload.parentId,
        action.payload.name,
        action.payload.isFolder
      );
    },
  },
});
export const { addToDirectory } = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
