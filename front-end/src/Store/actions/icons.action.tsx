import { Dispatch } from "react";
import {
  fetchFileIcons,
  fetchFolderIcons,
} from "../../library/firebase/firebase.lib";
import {
  setFileIcons,
  setFolderIcons,
} from "../reducres/SideDrawer/Directory/Directory.reducer";

export const fetchFileIconsAction = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const data = await fetchFileIcons();
      if (!data) {
        throw new Error("Something went wrong!");
      }
      dispatch(setFileIcons(data));
    } catch (err) {
      console.error("error : ", err);
    }
  };
};

export const fetchFolderIconsAction = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const data = await fetchFolderIcons();
      if (!data) {
        throw new Error("Something went wrong!");
      }
      dispatch(setFolderIcons(data));
    } catch (err) {
      console.error("error : ", err);
    }
  };
};
