import { fetchExtensionsList } from "../../firebase/firebase";

import {
  
} from "../reducres/SideDrawer/Directory/Directory.reducer";
import { Dispatch } from "react";
import { setExtensionsList } from "../reducres/SideDrawer/Extensions/Extensions.reducer";

export const fetchExtensionsListAction = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const data = await fetchExtensionsList();
      if (!data) {
        throw new Error("Something went wrong!");
      }
      dispatch(setExtensionsList(data));
    } catch (err) {
      console.log("error : ", err);
    }
  };
};
