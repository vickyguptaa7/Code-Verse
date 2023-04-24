import { Dispatch } from "react";
import { IExtensionInfo } from "../../Interface/Extension.interface";
import { fetchExtensionsList } from "../../library/firebase/firebase.lib";
import { setExtensionsList } from "../reducres/SideDrawer/Extensions/Extensions.reducer";

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
      console.error("error : ", err);
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
