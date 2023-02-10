import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sideDrawerInitialState = {
  isSidePannelPositionOnLeft: true,
  isDrawerOpen: true,
  isDrawerOpenSideIsLeft: false,
  sideDrawerWidth: 208, // 13 rem inital width of drawer
  showInSideDrawer: "file",
};

type drawerContent = "file" | "search" | "git" | "debug" | "extensions";

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
    setShowInSideDrawer(state, action: PayloadAction<drawerContent>) {
        state.showInSideDrawer = action.payload;
    },
  },
});

export const { setIsDrawerOpen, setSidePannelPosition, setSideDrawerWidth,setShowInSideDrawer } =
  sideDrawerSlice.actions;

export default sideDrawerSlice.reducer;