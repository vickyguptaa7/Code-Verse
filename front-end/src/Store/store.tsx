import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import BottomPannelReducer from "./reducres/BottomPannel/BottomPannel.reducer";
import DirectoryReducer from "./reducres/File/Directory.reducer";
import fileNavigationReducer from "./reducres/File/FileNavigation.reducer";
import SideDrawerReducer from "./reducres/SideDrawer/SideDrawer.reducer";

const store = configureStore({
  reducer: {
    fileNavigation: fileNavigationReducer,
    sideDrawer: SideDrawerReducer,
    bottomPannel: BottomPannelReducer,
    Directory: DirectoryReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
