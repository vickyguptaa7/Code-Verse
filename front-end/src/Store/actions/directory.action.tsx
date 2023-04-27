import { Dispatch } from "react";
import { getFromIndexDB } from "../../library/idb/idb.lib";
import { setDirectories } from "../reducres/SideDrawer/Directory/Directory.reducer";

export const setInitialDirectory = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const prevDirectory = await getFromIndexDB("vscode-directory");
      if (!prevDirectory) {
        return;
      }
      console.log(prevDirectory);
      dispatch(setDirectories(prevDirectory));
    } catch (err) {
      console.error("error : ", err);
    }
  };
};
