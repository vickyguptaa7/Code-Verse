import { Dispatch } from "react";
import { IExtensionInfo } from "../../Interface/Extension.interface";
import { fetchExtensionsList } from "../../library/firebase/firebase.lib";
import { setExtensionsList } from "../reducres/SideDrawer/Extensions/Extensions.reducer";

/**
 * This function fetches a list of extensions, sorts it, and dispatches it to the store.
 * @returns A function that takes a `dispatch` parameter and returns an asynchronous function. The
 * asynchronous function fetches a list of extensions, sorts it using a custom comparator function, and
 * dispatches an action with the sorted data. If an error occurs during the fetch or sort process, it
 * logs the error to the console.
 */
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

/**
 * The function compares two objects of type IExtensionInfo based on their extensionName property.
 * @param {IExtensionInfo} ext1 - IExtensionInfo type object representing the first extension to be
 * compared.
 * @param {IExtensionInfo} ext2 - ext2 is a variable representing an object of type IExtensionInfo,
 * which is being used as a parameter in the myComparator function. The function is designed to compare
 * two objects of type IExtensionInfo based on their extensionName property.
 * @returns The `myComparator` function is returning a number (-1, 0, or 1) based on the comparison of
 * the `extensionName` property of two `IExtensionInfo` objects (`ext1` and `ext2`). If
 * `ext1.extensionName` is less than `ext2.extensionName`, it returns -1. If `ext1.extensionName` is
 * greater than `
 */
function myComparator(ext1: IExtensionInfo, ext2: IExtensionInfo) {
  if (ext1.extensionName < ext2.extensionName) {
    return -1;
  }
  if (ext1.extensionName > ext2.extensionName) {
    return 1;
  }
  return 0;
}
