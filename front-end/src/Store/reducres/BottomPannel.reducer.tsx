import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bottomPannelInitialState = {
  isBottomPannelOpen: true,
  bottomPannelHeight: 208, // 13 rem inital width of drawer
  isMinimizeBottomPannel: false,
};

const bottomPannelSlice = createSlice({
  name: "sideDrawer",
  initialState: bottomPannelInitialState,
  reducers: {
    setIsBottomPannelOpen(state, action: PayloadAction<boolean>) {
      state.isBottomPannelOpen = action.payload;
    },
    setBottomPannelHeight(state, action: PayloadAction<number>) {
      state.bottomPannelHeight = action.payload;
    },
    setIsMinimizeBottomPannel(
      state,
      action: PayloadAction<boolean>
    ) {
      state.isMinimizeBottomPannel = action.payload;
    },
  },
});

export const { setIsBottomPannelOpen, setBottomPannelHeight,setIsMinimizeBottomPannel } =
  bottomPannelSlice.actions;

export default bottomPannelSlice.reducer;
