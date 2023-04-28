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

export const setInitialDirectory = () => {
  return async (dispatch: Dispatch<Object>) => {
    try {
      await intialManagementOfIndxDb();
      const prevDirectory = await getFromDirectoryIndexDB("vscode-directory");
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
