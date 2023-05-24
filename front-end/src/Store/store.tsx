import { Middleware, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  storeToDirectoryIndexDB,
  storeToFilesInformationDirectoryIndexDB,
} from "../library/idb/idb.lib";
import { storeToLocalStorage } from "../utils/localStorage.utils";
import BottomPannelReducer from "./reducres/BottomPannel/BottomPannel.reducer";
import TerminalReducer from "./reducres/BottomPannel/Terminal/Terminal.reducer";
import EditorReducer from "./reducres/Editor/Editor.reducer";
import fileNavigationReducer from "./reducres/Navigation/FileNavigation.reducer";
import NotificationReducer from "./reducres/Notification/Notification.reducer";
import DirectoryReducer from "./reducres/SideDrawer/Directory/Directory.reducer";
import ExtensionsReducer from "./reducres/SideDrawer/Extensions/Extensions.reducer";
import SearchReducer from "./reducres/SideDrawer/Search/Search.reducer";
import SideDrawerReducer from "./reducres/SideDrawer/SideDrawer.reducer";

const persistMiddleware: Middleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);
  if (action.type.startsWith("sideDrawer/setIsDrawerOpen")) {
    const result = next(action);
    storeToLocalStorage(
      "codeverse-is-drawer-open",
      store.getState().sideDrawer.isDrawerOpen
    );
    return result;
  }
  if (action.type.startsWith("bottomPannel/setIsBottomPannelOpen")) {
    const result = next(action);
    storeToLocalStorage(
      "codeverse-is-bottom-pannel-open",
      store.getState().bottomPannel.isBottomPannelOpen
    );
    return result;
  }
  if (
    action.type.startsWith("Directory/addFileOrFolderToDirectory") ||
    action.type.startsWith("Directory/renameFileOrFolderOfDirectory") ||
    action.type.startsWith("Directory/deleteFileOrFolderOfDirectory") ||
    action.type.startsWith("Directory/addExternalFileOrFolderToDirectory")
  ) {
    const result = next(action);
    storeToDirectoryIndexDB(
      "codeverse-directory",
      store.getState().Directory.directories
    );
    return result;
  }
  if (
    action.type.startsWith("Directory/updateFileBody") ||
    action.type.startsWith("Directory/setFilesInformation")
  ) {
    const result = next(action);
    for (const file of action.payload) {
      storeToFilesInformationDirectoryIndexDB(
        file.id,
        store.getState().Directory.filesInformation[file.id]
      );
    }
    return result;
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    fileNavigation: fileNavigationReducer,
    sideDrawer: SideDrawerReducer,
    bottomPannel: BottomPannelReducer,
    Directory: DirectoryReducer,
    search: SearchReducer,
    extension: ExtensionsReducer,
    terminal: TerminalReducer,
    editor: EditorReducer,
    notification: NotificationReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(persistMiddleware);
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
