import { Dispatch } from "react";
import { intialManagementOfIndxDb } from "../../Assets/Data/FileFolder.data";
import {
  getFromDirectoryIndexDB,
  getFromFilesInformationIndexDB,
} from "../../library/idb/idb.lib";
import {
  initialAddFilesInformation,
  setDirectories,
} from "../reducres/SideDrawer/Directory/Directory.reducer";

/**
 * This function sets the initial directory by retrieving data from indexedDB and dispatching actions
 * to update the state.
 * @returns A function that takes a dispatch function as an argument and returns a promise. When the
 * function is called, it will try to perform some actions related to managing an IndexedDB database,
 * retrieve data from the database, and dispatch actions to update the Redux store with the retrieved
 * data. If an error occurs, it will be caught and logged to the console.
 */
export const setInitialDirectory = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      await intialManagementOfIndxDb();
      const prevDirectory = await getFromDirectoryIndexDB(
        "codeverse-directory"
      );
      const prevFilesInformation = await getFromFilesInformationIndexDB();
      if (!prevDirectory) {
        return;
      }
      dispatch(setDirectories(prevDirectory));
      dispatch(initialAddFilesInformation(prevFilesInformation));
    } catch (err) {
      console.error("error : ", err);
    }
  };
};
