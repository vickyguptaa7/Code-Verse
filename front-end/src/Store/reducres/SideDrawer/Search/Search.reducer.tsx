import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavFile } from "../../../../Interface/file.interface";

const searchInitialState = {
  replacementText: "",
  searchedText: "",
  isReplaceOpen: false,
  searchedResultFiles: [] as INavFile[],
};

const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    updateSearchedText(state, action: PayloadAction<string>) {
      state.searchedText = action.payload;
    },
    updateReplacementText(state, action: PayloadAction<string>) {
      state.replacementText = action.payload;
    },
    setSearchedResultFiles(state, action: PayloadAction<INavFile[]>) {
      state.searchedResultFiles = action.payload;
    },
    setIsReplaceOpen(state, action: PayloadAction<boolean>) {
      state.isReplaceOpen = action.payload;
    },
  },
});

export const { updateSearchedText,updateReplacementText,setSearchedResultFiles,setIsReplaceOpen } = searchSlice.actions;

export default searchSlice.reducer;
