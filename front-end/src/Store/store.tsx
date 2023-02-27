import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import BottomPannelReducer from "./reducres/BottomPannel.reducer";
import FileDirectoryReducer from "./reducres/File/FileDirectory.reducer";
import fileNavigationReducer from "./reducres/File/FileNavigation.reducer";
import SideDrawerReducer from "./reducres/SideDrawer.reducer";

const store = configureStore({
  reducer: {
    fileNavigation: fileNavigationReducer,
    sideDrawer: SideDrawerReducer,
    bottomPannel: BottomPannelReducer,
    fileDirectory:FileDirectoryReducer
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
