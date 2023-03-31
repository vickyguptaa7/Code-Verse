import { Dispatch } from "react";
import { fetchExtensionsList } from "../../library/firebase/firebase.lib";

import { setExtensionsList } from "../reducres/SideDrawer/Extensions/Extensions.reducer";
import { IExtensionInfo } from "../../Interface/Extension.interface";

export const fetchExtensionsListAction = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      const data = await fetchExtensionsList();
      if (!data) {
        throw new Error("Something went wrong!");
      }
      const sortedData = data.sort(myComparator);
      dispatch(setExtensionsList(sortedData));
    } catch (err) {
      console.log("error : ", err);
    }
  };
};

function myComparator(ext1: IExtensionInfo, ext2: IExtensionInfo) {
  if (ext1.extensionName < ext2.extensionName) {
    return -1;
  }
  if (ext1.extensionName > ext2.extensionName) {
    return 1;
  }
  return 0;
}
