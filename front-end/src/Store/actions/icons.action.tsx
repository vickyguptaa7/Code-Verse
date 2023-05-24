import { Dispatch } from "react";
import {
  fetchFileIcons,
  fetchFolderIcons,
} from "../../library/firebase/firebase.lib";
import {
  setFileIcons,
  setFolderIcons,
} from "../reducres/SideDrawer/Directory/Directory.reducer";

/**
 * This is a function that fetches file icons and dispatches them to the store.
 * @returns The function `fetchFileIconsAction` is returning an asynchronous function that takes a
 * `dispatch` function as an argument. This function is making an API call to `fetchFileIcons` and
 * dispatching the result using the `setFileIcons` action creator. If there is an error, it is being
 * caught and logged to the console.
 */
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

/**
 * This function fetches folder icons and dispatches an action to set them in the store.
 * @returns The function `fetchFolderIconsAction` is returning an asynchronous function that takes a
 * `dispatch` function as an argument. This function tries to fetch folder icons data using the
 * `fetchFolderIcons` function and dispatches the `setFolderIcons` action with the fetched data. If
 * there is an error, it logs the error to the console.
 */
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
