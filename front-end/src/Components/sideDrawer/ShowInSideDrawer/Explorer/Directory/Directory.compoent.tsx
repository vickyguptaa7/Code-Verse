import React from "react";
import IDirectory from "../../../../../Interface/directory.interface";
import { FILE_DIRECTORY_AMOUNT_OF_SHIFT } from "../../../sideDrawer.Constant";
import File from "./file.component";
import Folder from "./folder.component";
interface IPROPS {
  directoryInfo: Array<IDirectory>;
  shiftAmount: number;
}
const Directory: React.FC<IPROPS> = ({ directoryInfo, shiftAmount }) => {
  const directoryList = directoryInfo.map((document) => {
    if (document.isFolder) {
      return (
        <Folder
          folderInfo={document}
          key={document.id}
          shiftAmount={shiftAmount}
          children={
            <Directory
              directoryInfo={document.children}
              shiftAmount={shiftAmount + FILE_DIRECTORY_AMOUNT_OF_SHIFT}
            />
          }
        />
      );
    }
    return (
      <File fileInfo={document} shiftAmount={shiftAmount} key={document.id} />
    );
  });
  return <>{directoryList}</>;
};

export default Directory;
