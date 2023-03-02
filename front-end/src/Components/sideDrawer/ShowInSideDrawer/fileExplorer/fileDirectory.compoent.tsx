import React from "react";
import directory from "../../../../Interface/directory.interface";
import { FILE_DIRECTORY_AMOUNT_OF_SHIFT } from "../../sideDrawer.Constant";
import File from "./fileDirectory/file.component";
import Folder from "./fileDirectory/folder.component";
interface IPROPS {
  directoryInfo: Array<directory>;
  shiftAmount: number;
}
const FileDirectory: React.FC<IPROPS> = ({ directoryInfo, shiftAmount }) => {
  const directoryList = directoryInfo.map((document) => {
    if (document.isFolder) {
      return (
        <Folder
          folderInfo={document}
          key={document.id}
          shiftAmount={shiftAmount}
          children={
            <FileDirectory
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

export default FileDirectory;
