import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SIDE_DRAWER_WIDTH_INITIAL } from "../../../Components/sideDrawer/sideDrawer.Constant";
import {
  getPrevIsDeleteWarningEnable,
  getPrevIsDrawerOpen,
  getPrevPosition,
} from "../../../utils/localStorage.utils";

export type DrawerContent = "file" | "search" | "git" | "debug" | "extensions";

const sideDrawerInitialState = {
  isSidePannelPositionOnLeft: getPrevPosition().isSidePannelPositionOnLeft,
  isDrawerOpen: getPrevIsDrawerOpen(),
  isDrawerOpenSideIsLeft: getPrevPosition().isDrawerOpenSideIsLeft,
  sideDrawerWidth: SIDE_DRAWER_WIDTH_INITIAL,
  showInSideDrawer: "file" as DrawerContent,
  isDeleteWarningEnable: getPrevIsDeleteWarningEnable(),
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
