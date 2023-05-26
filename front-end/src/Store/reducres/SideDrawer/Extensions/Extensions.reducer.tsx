import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExtensionInfo } from "../../../../@types/Extension.d";

const extensionInitialState = {
  extensionSearchedText: "",
  extensionsList: [] as IExtensionInfo[],
  isInstalledExtensionOpen: true,
  isRecommendedExtensionOpen: false,
};

const exntensionSlice = createSlice({
  name: "exntension",
  initialState: extensionInitialState,
  reducers: {
    updateExtensionSearchedText(state, action: PayloadAction<string>) {
      state.extensionSearchedText = action.payload;
    },
    setIsInstalledExtensionOpen(state, action: PayloadAction<boolean>) {
      state.isInstalledExtensionOpen = action.payload;
    },
    setIsRecommendedExtensionOpen(state, action: PayloadAction<boolean>) {
      state.isRecommendedExtensionOpen = action.payload;
    },
    setExtensionsList(state, action: PayloadAction<IExtensionInfo[]>) {
      state.extensionsList = action.payload;
    },
  },
});

export const {
  updateExtensionSearchedText,
  setIsInstalledExtensionOpen,
  setIsRecommendedExtensionOpen,
  setExtensionsList,
} = exntensionSlice.actions;

export default exntensionSlice.reducer;
