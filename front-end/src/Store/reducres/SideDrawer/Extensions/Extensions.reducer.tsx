import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const extensionInitialState = {
  extensionSearchedText: "",
  extensionsList:[],
  isInstalledExtensionOpen:true,
  isRecommendedExtensionOpen:false,
};

const exntensionSlice = createSlice({
  name: "exntension",
  initialState: extensionInitialState,
  reducers: {
    updateExtensionSearchedText(state, action: PayloadAction<string>) {
      state.extensionSearchedText = action.payload;
    },
    setIsInstalledExtensionOpen(state, action: PayloadAction<boolean>){
        state.isInstalledExtensionOpen = action.payload;
    },
    setIsRecommendedExtensionOpen(state, action: PayloadAction<boolean>){
        state.isRecommendedExtensionOpen = action.payload;
    }
  },
});

export const { updateExtensionSearchedText,setIsInstalledExtensionOpen,setIsRecommendedExtensionOpen } = exntensionSlice.actions;

export default exntensionSlice.reducer;
