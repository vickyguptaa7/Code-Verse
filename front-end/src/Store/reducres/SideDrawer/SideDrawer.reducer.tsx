import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DrawerContent = "file" | "search" | "git" | "debug" | "extensions";

const sideDrawerInitialState = {
  isSidePannelPositionOnLeft: true,
  isDrawerOpen: true,
  isDrawerOpenSideIsLeft: false,
  sideDrawerWidth: 208, // 13 rem inital width of drawer
  showInSideDrawer: "file" as DrawerContent,
  isDeleteWarningEnable: true,
};

const sideDrawerSlice = createSlice({
  name: "sideDrawer",
  initialState: sideDrawerInitialState,
  reducers: {
    setIsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
    setSidePannelPosition(state, action: PayloadAction<"left" | "right">) {
      state.isSidePannelPositionOnLeft =
        action.payload === "left" ? true : false;
      state.isDrawerOpenSideIsLeft = action.payload === "left" ? false : true;
    },
    setSideDrawerWidth(state, action: PayloadAction<number>) {
      state.sideDrawerWidth = action.payload;
    },
    setShowInSideDrawer(state, action: PayloadAction<DrawerContent>) {
      state.showInSideDrawer = action.payload;
    },
    setIsDeleteWarningEnable(state, action: PayloadAction<boolean>) {
      state.isDeleteWarningEnable = action.payload;
    },
    toggleIsDrawerOpen(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {
  setIsDrawerOpen,
  setSidePannelPosition,
  setSideDrawerWidth,
  setShowInSideDrawer,
  setIsDeleteWarningEnable,
  toggleIsDrawerOpen,
} = sideDrawerSlice.actions;

export default sideDrawerSlice.reducer;
