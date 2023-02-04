import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import fileNavigationReducer from "./reducres/FileNavigation.reducer";
import SideDrawerReducer from "./reducres/SideDrawer.reducer";

const store = configureStore({
  reducer: {
    fileNavigation: fileNavigationReducer,
    sideDrawer: SideDrawerReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
