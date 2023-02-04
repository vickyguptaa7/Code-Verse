import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sideDrawerInitialState = {
  isSidePannelPositionOnLeft: true,
  isDrawerOpen: true,
  isDrawerOpenSideIsLeft: false,
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
  },
});

export const { setIsDrawerOpen, setSidePannelPosition } =
  sideDrawerSlice.actions;

export default sideDrawerSlice.reducer;
