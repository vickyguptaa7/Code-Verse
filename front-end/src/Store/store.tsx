import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import BottomPannelReducer from "./reducres/BottomPannel/BottomPannel.reducer";
import DirectoryReducer from "./reducres/SideDrawer/Directory/Directory.reducer";
import fileNavigationReducer from "./reducres/Navigation/FileNavigation.reducer";
import SearchReducer from "./reducres/SideDrawer/Search/Search.reducer";
import SideDrawerReducer from "./reducres/SideDrawer/SideDrawer.reducer";
import ExtensionsReducer from "./reducres/SideDrawer/Extensions/Extensions.reducer";
import TerminalReducer from "./reducres/BottomPannel/Terminal/Terminal.reducer";

const store = configureStore({
  reducer: {
    fileNavigation: fileNavigationReducer,
    sideDrawer: SideDrawerReducer,
    bottomPannel: BottomPannelReducer,
    Directory: DirectoryReducer,
    search: SearchReducer,
    extension:ExtensionsReducer,
    terminal:TerminalReducer
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
