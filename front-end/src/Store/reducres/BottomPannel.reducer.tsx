import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bottomPannelInitialState = {
  isBottomPannelOpen: true,
  bottomPannelHeight: 208, // 13 rem inital width of drawer
  isMinimizeBottomPannel: false,
  showInBottomPannel: "input",
};

type bottomPannelContent="input" | "output" | "terminal";

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
    setIsMinimizeBottomPannel(state, action: PayloadAction<boolean>) {
      state.isMinimizeBottomPannel = action.payload;
    },
    setShowInBottomPannel(
      state,
      action: PayloadAction<bottomPannelContent>
    ) {
        state.showInBottomPannel = action.payload;
    },
    resetBottomPannel(state){
      state.bottomPannelHeight=bottomPannelInitialState.bottomPannelHeight;
      state.isBottomPannelOpen=false;
      state.isMinimizeBottomPannel=bottomPannelInitialState.isMinimizeBottomPannel;
      state.showInBottomPannel=bottomPannelInitialState.showInBottomPannel;
    }
  },
});

export const {
  setIsBottomPannelOpen,
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
  setShowInBottomPannel,
  resetBottomPannel
} = bottomPannelSlice.actions;

export default bottomPannelSlice.reducer;
